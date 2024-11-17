"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { PlaceholdersAndVanishInputDemo } from "./acceternitycomponents/PlaceholdersAndVanishInputDemo";
import { Paperclip } from "lucide-react";
import Chatsidebar from "./Chatsidebar";

export const chatdata = [
  {
    uid: "user123",
    file_hash: "filehash12345",
    input_query: "What is the capital of France?",
    question_hist: [
      "What is the capital of France?",
      "Tell me about French cuisine.",
    ],
    answer_hist: [
      "The capital of France is Paris.",
      "French cuisine is known for its elegance and variety, featuring dishes such as croissants, escargot, and coq au vin.",
    ],
    timestamp: "2024-11-16T10:15:00Z",
    inuse: false,
  },
  {
    uid: "user456",
    file_hash: "filehash67890",
    input_query: "Explain Newton's laws of motion.",
    question_hist: ["Explain Newton's laws of motion.", "What is inertia?"],
    answer_hist: [
      "Newton's laws of motion describe the relationship between a body and the forces acting on it. They are: 1. Law of Inertia, 2. Law of Acceleration, 3. Action-Reaction.",
      "Inertia is the property of an object to resist changes in its state of motion or rest.",
    ],
    timestamp: "2024-11-15T14:45:00Z",
    inuse: false,
  },
  {
    uid: "user789",
    file_hash: "filehash11223",
    input_query: "What are the benefits of meditation?",
    question_hist: [
      "What are the benefits of meditation?",
      "How often should I meditate?",
    ],
    answer_hist: [
      "Meditation can reduce stress, improve focus, enhance self-awareness, and promote emotional health.",
      "It is recommended to meditate daily, even for just 10-20 minutes.",
    ],
    timestamp: "2024-11-16T08:30:00Z",
    inuse: false,
  },
];

const Chatbot = () => {
  const [currChatUid, setCurrChatUid] = useState("");

  // Sort chats based on the timestamp, latest to oldest
  const sortedChatData = chatdata.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="h-screen w-full flex gap-5 justify-center items-center p-8 ">
      {/* sider bar / history */}
      <div className="w-[20%] h-full border-white/20 border-[0.5px] rounded-lg p-4">
        <Chatsidebar
          currChatUid={currChatUid}
          setCurrChatUid={setCurrChatUid}
          sortedChatData={sortedChatData}
        />
      </div>
      {/* Middle Chat section */}
      <Chat currChatUid={currChatUid} />
      {/*  Right Document section */}
      <div className="w-[40%] h-full flex flex-col border-white/20 bg-stone-100/2 border-[0.5px] rounded-lg">
        {/* Document */}
        <div className="h-full w-full "></div>
      </div>
    </div>
  );
};

export default Chatbot;
