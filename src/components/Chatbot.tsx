"use client";

import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Chatsidebar from "./Chatsidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const db = getFirestore(app);

const Chatbot: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [currChatData, setcurrChatData] = useState<ChatData | undefined>(undefined);
  const [chatdata, setChatdata] = useState<ChatData[]>([]);
  const [currActiveFile, setCurrActiveFile] = useState<FileData>({
    file_id: "",
    file_name: "",
    file_path_relative: "",
    file_path: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const fetchChats = async () => {
      try {
        const userRef = doc(db, "userdata", user.id);
        const userDocSnap = await getDoc(userRef);

        const userData = userDocSnap.data();
        console.log("User data:", userData);
        const userChats = userData?.chats || [];

        const chatDataPromises = userChats.map(async (chatId: string) => {
          const chatDocRef = doc(db, "chatdata", chatId);
          const chatDocSnap = await getDoc(chatDocRef);

          if (chatDocSnap.exists()) {
            return { id: chatId, ...chatDocSnap.data() } as ChatData;
          }
          return null;
        });

        const fetchedChats = await Promise.all(chatDataPromises);
        const validChats = fetchedChats.filter((chat) => chat !== null) as ChatData[];

        validChats.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setChatdata(validChats);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    setTimeout(() => {
      fetchChats();
    }, 1000);
  }, [user, router]);

  useEffect(() => {
    const fetchFile = async () => {
      if (currChatData) {
        const fileDocRef = doc(db, "files", currChatData.file_hash);
        const fileDocSnap = await getDoc(fileDocRef);

        if (fileDocSnap.exists()) {
          const fileData = fileDocSnap.data();
          setCurrActiveFile({
            file_id: currChatData.file_hash,
            file_name: fileData.file_name,
            file_path_relative: fileData.file_path_relative,
            file_path: fileData.file_path,
          });
        }
      }
    };

    fetchFile();
  }, [currChatData]);

  return (
    <div className="h-screen w-full flex gap-5 justify-center items-center p-8 bg-gradient-to-b from-cyan-900/30 from-0% to-cyan-200/40 to-100%">
      <div
        className={`overflow-auto overflow-x-hidden w-[20%] h-full border-white/20 border-[0.5px] rounded-lg p-4 bg-zinc-950`}
      >
        <Chatsidebar
          sortedChatData={chatdata}
          setcurrChatData={setcurrChatData}
        />
      </div>
      <Chat
        sortedChatData={chatdata}
        setSortedChatData={setChatdata}
        setcurrChatData={setcurrChatData}
        currChatData={currChatData}
        currActiveFile={currActiveFile}
      />
      <div
        className={`${
          currChatData === undefined ? "hidden" : "w-[40%]"
        } h-full flex flex-col border-white/20 bg-stone-100/2 border-[0.5px] rounded-lg`}
      >
        <div className="h-full w-full overflow-y-auto scroll-2">
          <iframe
            className="h-full w-full rounded-lg border-0"
            title="PDF Viewer"
            src={currActiveFile.file_path_relative + "#toolbar=0"}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
