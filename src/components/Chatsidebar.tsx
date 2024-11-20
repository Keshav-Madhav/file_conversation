import React from "react";
import Header from "./Header";

const Chatsidebar = ({
  setcurrChatData,
  sortedChatData,
}: {
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  sortedChatData: ChatData[];
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4">
        <button
          className="grey_btn"
          onClick={() => {
            setcurrChatData(undefined);
          }}
        >
          Talk To New File
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Chat History</h1>
        {sortedChatData.length > 0 ? (
          <ul>
            <hr className="border-stone-900 pb-4" />
            {sortedChatData.map((chat, index) => (
              <li
                className="h-fit flex flex-col gap-4 pb-4 cursor-pointer"
                key={index}
                onClick={() => setcurrChatData(chat)}
              >
                <p>
                  {chat.question_hist && chat.question_hist.length > 0
                    && chat.question_hist[1] || "New Untitled Chat"}
                </p>
                <hr className="border-stone-900" />
              </li>
            ))}
          </ul>
        ):(
          <p>No Previous Chats.</p>
        )}
      </div>
    </div>
  );
};

export default Chatsidebar;
