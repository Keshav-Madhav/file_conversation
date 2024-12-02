"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FileUpload } from "@/components/ui/file-upload";
import { getFirestore, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { app } from "../../firebase"; // Your Firebase configuration file
import createEmbeddingsForFileAPI from "@/lib/apis/createEmbbedingApi";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useUploadThing } from "@/lib/uploadThing";

const db = getFirestore(app);

interface FileUploadDemoProps {
  sortedChatData: ChatData[];
  setSortedChatData: React.Dispatch<React.SetStateAction<ChatData[]>>;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  currChatData?: ChatData;
}

export function FileUploadDemo({
  sortedChatData,
  setSortedChatData,
  setcurrChatData,
}: FileUploadDemoProps) {
  const { startUpload } = useUploadThing("media")
  const router = useRouter();
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const uid = user?.id || "Nan";

  const addChatData = async (fileId: string, file_name: string) => {
    const supportedExtensions = ["pdf", "png", "jpeg", "jpg"];
    const fileExtension = file_name.split(".").pop()?.toLowerCase() ?? "";

    const chatData = {
      id: uuidv4(),
      file_hash: fileId,
      input_query: "",
      question_hist: [file_name],
      answer_hist: [
        `Welcome to FileConvo! Ask me anything about **${file_name}**. I will do my best to help you.${
          !supportedExtensions.includes(fileExtension)
            ? "\n\n_**Note:** I will be unable to display the file to you while we chat. Even though I can read the file, I cannot display it yet._"
            : ""
        }`,
      ],
      timestamp: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "chatdata", chatData.id), chatData);
      setSortedChatData([...sortedChatData, chatData]);
      return chatData;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const updateUserChatArray = async (newChatId: string) => {
    const docRef = doc(db, "userdata", uid);

    try {
      await updateDoc(docRef, {
        chats: arrayUnion(newChatId),
      });
      console.log("User chat array updated successfully.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        try{
          await setDoc(
            docRef,
            { chats: [newChatId] },
            { merge: true }
          );
        } catch (error) {
          console.error("Error updating user chat array:", error);
        }
      } else {
        console.error("Unknown error updating user chat array:", error);
      }
    }
  };

  const handleFileUpload = async (file: File) => {
    let filePath;
    const fileId = uuidv4();

    try {
      setIsUploading(true);
      const fileResponse = await startUpload([file])
      if(fileResponse){
        console.log(fileResponse[0].url)
        filePath = fileResponse[0].url
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setIsUploading(false);
    }

    if(filePath){
      setIsReading(true);
      try {
        const response = await createEmbeddingsForFileAPI(filePath, fileId, file.type, uid);

        if (response.status === 200) {
          await setDoc(doc(db, "files", fileId), {
            file_id: fileId,
            file_name: file.name,
            file_path_relative: filePath,
            file_path: filePath,
          });
          setIsReading(false);

          const chat = await addChatData(fileId, file.name);
          if (!chat) return;

          setcurrChatData(chat);
          await updateUserChatArray(chat.id);
        } else {
          console.error(
            "Failed to create embeddings:",
            response.data?.error || "Unknown error"
          );
          setIsReading(false);
        }
      } catch (error) {
        console.error("Error during file upload or embedding process:", error);
        setIsReading(false);
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={(file) => handleFileUpload(file)} disabled={isReading || isUploading} />
      {isUploading && (
        <div className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-lg">Uploading file...</p>
        </div>
      )}
      {isReading && (
        <div className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-lg ">Reading file...</p>
        </div>
      )}
    </div>
  );
}