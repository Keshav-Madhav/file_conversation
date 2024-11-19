import React from "react";

interface ChatData {
  id: string;
  file_hash: string;
  input_query: string;
  question_hist: string[];
  answer_hist: string[];
  timestamp: string;
  inuse: boolean;
}

const Chatsidebar = ({
  currChatData,
  setcurrChatData,
  sortedChatData,
}: {
  currChatData: ChatData | undefined;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  sortedChatData: ChatData[];
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1>Start New Chat</h1>
        <button
          className="grey_btn"
          onClick={() => {
            setcurrChatData(undefined);
          }}
        >
          Start
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Chat History</h1>
        <ul>
          {sortedChatData.map((chat, index) => (
            <li
              className="flex flex-col gap-4 pb-4"
              key={index}
              onClick={() => setcurrChatData(chat)}
            >
              <p>
                {chat.question_hist && chat.question_hist.length > 0
                  && chat.question_hist[1]}
              </p>
              <hr className="border-stone-900" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatsidebar;
