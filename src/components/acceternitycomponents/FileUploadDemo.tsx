"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { FileUpload } from "@/components/ui/file-upload";
import { getFirestore, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { app } from "../../firebase"; // Your Firebase configuration file
import createEmbeddingsForFileAPI from "@/lib/apis/createEmbbedingApi";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

const db = getFirestore(app);

interface FilePathResult {
  filePath: string;
  relativeFilePath: string;
}

const getFilePaths = (file: File): FilePathResult => {
  const { name } = file;

  switch (name) {
    case "Front_End_Resume.pdf":
      return {
        filePath: "D:/Programming Projects/Personal/file_conversation/public/Front_End_Resume.pdf",
        relativeFilePath: "Front_End_Resume.pdf",
      };

    case "Ecotourism and Environmental Law - Keshav.pdf":
      return {
        filePath: "D:/Programming Projects/Personal/file_conversation/public/Ecotourism and Environmental Law - Keshav.pdf",
        relativeFilePath: "Ecotourism and Environmental Law - Keshav.pdf",
      };

    default:
      return {
        filePath: "/files/documents/document.pdf",
        relativeFilePath: "./documents/document.pdf",
      };
  }
};

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
  const router = useRouter();
  const { user } = useUser();

  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const uid = user?.id || "Nan";

  const addChatData = async (fileId: string, file_name: string) => {
    const chatData = {
      id: uuidv4(),
      file_hash: fileId,
      input_query: "",
      question_hist: [""],
      answer_hist: ["Welcome to FileConvo! Ask me anything about " + file_name +". I will do my best to help you."],
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
    const paths = getFilePaths(file);
    const fileId = uuidv4();

    try {
      const response = await createEmbeddingsForFileAPI(paths.filePath, fileId, uid);

      if (response.status === 200) {
        await setDoc(doc(db, "files", fileId), {
          file_id: fileId,
          file_name: file.name,
          file_path_relative: paths.relativeFilePath,
          file_path: paths.filePath,
        });

        const chat = await addChatData(fileId, file.name);
        if (!chat) return;

        setcurrChatData(chat);
        await updateUserChatArray(chat.id);
      } else {
        console.error(
          "Failed to create embeddings:",
          response.data?.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during file upload or embedding process:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={(files) => handleFileUpload(files[0])} />
    </div>
  );
}