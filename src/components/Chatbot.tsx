"use client";

import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Chatsidebar from "./Chatsidebar";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/firebase";

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

const Chatbot: React.FC = () => {
  const [currChatData, setcurrChatData] = useState<ChatData | undefined>(undefined);
  const [chatdata, setChatdata] = useState<ChatData[]>([]);
  const [sortedChatData, setSortedChatData] = useState<ChatData[]>([]);

  // Fetch chat data from Firestore
  const fetchChats = async () => {
    try {
      const docRef = collection(db, "chatdata");
      const docSnap = await getDocs(docRef);

      const firebaseData: ChatData[] = [];
      docSnap.forEach((doc) => {
        const data = doc.data();
        
        // Check if the object is not empty
        if (Object.keys(data).length === 0) return;

        const chatData = data as ChatData;
        firebaseData.push(chatData);
        console.log(chatData);
      });

      setChatdata(firebaseData);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Sort chat data whenever `chatdata` changes
  useEffect(() => {
    if (chatdata && chatdata.length > 0) {
      const sortedData = [...chatdata].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setSortedChatData(sortedData);
    }
  }, [chatdata]);

  return (
    <div className="h-screen w-full flex gap-5 justify-center items-center p-8 ">
      <div
        className={`overflow-scroll overflow-x-hidden w-[20%] h-full border-white/20 border-[0.5px] rounded-lg p-4`}
      >
        {sortedChatData.length > 0 ? (
          <Chatsidebar
            sortedChatData={sortedChatData}
            setcurrChatData={setcurrChatData}
          />
        ) : (
          <p>No chats available</p>
        )}
      </div>
      {sortedChatData.length > 0 && (
        <Chat
          sortedChatData={sortedChatData}
          setSortedChatData={setSortedChatData}
          setcurrChatData={setcurrChatData}
          currChatData={currChatData}
        />
      )}
      <div
        className={`${
          currChatData === undefined ? "hidden" : "w-[40%]"
        } h-full flex flex-col border-white/20 bg-stone-100/2 border-[0.5px] rounded-lg`}
      >
        <div className="h-full w-full overflow-y-scroll scroll-2">
          <iframe
            className="h-full w-full rounded-lg border-0"
            title="PDF Viewer"
            src="C:/Users/kartik/Downloads/Untitled%20document%20(3).pdf"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
