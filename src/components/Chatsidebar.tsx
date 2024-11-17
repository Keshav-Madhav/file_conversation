import React, { useEffect, useState } from "react";
import { chatdata } from "./Chatbot";

// { setCurrChatuid, startNewChat }
const Chatsidebar = ({
  currChatUid,
  setCurrChatUid,
  sortedChatData,
}: {
  currChatUid: string;
  setCurrChatUid: React.Dispatch<React.SetStateAction<string>>;
  sortedChatData: {
    uid: string;
    file_hash: string;
    input_query: string;
    question_hist: string[];
    answer_hist: string[];
    timestamp: string;
    inuse: boolean;
  }[];
}) => {
  useEffect(() => {
    useit(currChatUid);
  });
  const useit = (curruid: string) => {
    console.log("function called");
    chatdata.map((chat) => {
      if (chat.inuse && chat.uid !== curruid) {
        chat.inuse = false;
      }
      if (!chat.inuse && chat.uid === curruid) {
        chat.inuse = true;
        setCurrChatUid(chat.uid);
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1>Start New Chat</h1>
        <button className="grey_btn">Start</button>
      </div>
      {/* Chat History */}
      <div className="flex flex-col gap-4">
        <h1>Chat History</h1>
        <ul>
          {sortedChatData.map((chat) => (
            <li
              className="flex flex-col gap-4 pb-4"
              key={chat.uid}
              onClick={() => useit(chat.uid)}
            >
              <p className="">{chat.input_query}</p>
              <hr className="border-stone-900" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatsidebar;
