"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FileUpload } from "@/components/ui/file-upload";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { app } from "../../firebase"; // Your Firebase configuration file
import createEmbeddingsForFileAPI from "@/lib/apis/createEmbbedingApi";
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(app);


interface ChatData {
  id: string;
  file_hash: string;
  input_query: string;
  question_hist: string[];
  answer_hist: string[];
  timestamp: string;
  inuse: boolean;
}

export function FileUploadDemo({
  sortedChatData,
  setSortedChatData,
  setcurrChatData,
  currChatData,
}: {
  sortedChatData: ChatData[];
  setSortedChatData: React.Dispatch<React.SetStateAction<ChatData[]>>;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData| undefined>>;
  currChatData: ChatData | undefined;
}) {
  const {user} = useUser();
  const uid = user?.id || "No UID found";
  const [chatid, setChatid] = useState<string>("");

  // Adding chat data
  async function addChatData() {
    // Define your array of objects
    const chatDataArray = {
      id: uuidv4(),
      file_hash: "DwxQP1aK7XbJKtFnzjaJ",
      input_query: "",
      question_hist: [""],
      answer_hist: [""],
      timestamp: new Date().toISOString(),
      inuse: true,
    };

    try {
      const docRef = await addDoc(collection(db, "chatdata"), chatDataArray);
      
      // const docRef = collection(db, "chatdata"); // Auto-generate a document ID
      // await setDoc(docRef, chatDataArray);
      setSortedChatData([...sortedChatData,chatDataArray])
      setChatid(docRef.id);
      return chatDataArray;

    } catch (error) {
      console.error("Error adding data:", error);
    }
  }


  // updating user data
  async function updateUserChatArray(newChatId:string) {
    const docRef = doc(db, "userdata", uid);
    await updateDoc(docRef, {
      Chats: arrayUnion(newChatId),
    });
  }

  const handleFileUpload = async () => {
    try {
      const response = await createEmbeddingsForFileAPI(
        "C:/Users/kartik/Downloads/Untitled document (3).pdf",
        "DwxQP1aK7XbJKtFnzjaJ",
        uid
      );
  
      if (response.status === 200) {
        if (!currChatData) {
          const newChatId = await addChatData();
          await updateUserChatArray(chatid); // Add chat UID to user data
          setcurrChatData(newChatId);
  
          // Mark the chat as "in use"
          const chatDocRef = doc(db, "chatdata", chatid);
          await updateDoc(chatDocRef, { inuse: true });
        }
      } else {
        console.error(
          "Failed to create embeddings:",
          response.data.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during file upload or embedding process:", error);
    }
  };  

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={() => handleFileUpload()} />
    </div>
  );
}
