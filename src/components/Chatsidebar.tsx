import React from "react";
import ChatbotHeader from "./ChatbotHeader";
import {
  IconFileSpark,
  IconLayoutGrid,
} from "@tabler/icons-react";
import Link from "next/link";

const Chatsidebar = ({
  setcurrChatData,
  sortedChatData,
}: {
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  sortedChatData: ChatData[];
}) => {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between flex-col h-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-white text-lg py-1 flex gap-4 justify-start"
            >
              <IconLayoutGrid className="text-teal-600  h-7 w-7" />
              Explore Us
            </Link>
            <button
              className="text-white text-lg py-1 flex gap-4 justify-start"
              onClick={() => {
                setcurrChatData(undefined);
              }}
            >
              <IconFileSpark className="text-teal-600 h-7 w-7" />
              Start New Chat
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-normal flex gap-4">
              {/* <IconHistory className="text-teal-600 h-7 w-7" /> */}
              Chat History
            </h1>
            {sortedChatData.length > 0 ? (
              <ul>
                <hr className="border-cyan-700/50 pb-4" />
                {sortedChatData.map((chat, index) => (
                  <li
                    className="h-fit flex flex-col gap-4 pb-4 cursor-pointer text-white"
                    key={index}
                    onClick={() => setcurrChatData(chat)}
                  >
                    <p>
                      {(chat.question_hist &&
                        chat.question_hist.length > 0 &&
                        chat.question_hist[0]) ||
                        "New Untitled Chat"}
                    </p>
                    <hr className="border-cyan-700/50" />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Previous Chats.</p>
            )}
          </div>
        </div>
      </div>
      <ChatbotHeader />
    </div>
  );
};

export default Chatsidebar;
