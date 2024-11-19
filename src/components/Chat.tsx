import React from "react";
import { PlaceholdersAndVanishInputDemo } from "./acceternitycomponents/PlaceholdersAndVanishInputDemo";
import { FileUploadDemo } from "./acceternitycomponents/FileUploadDemo";

interface ChatData {
  id: string;
  file_hash: string;
  input_query: string;
  question_hist: string[];
  answer_hist: string[];
  timestamp: string;
  inuse: boolean;
}

const Chat = ({
  sortedChatData,
  setSortedChatData,
  setcurrChatData,
  currChatData,
}: {
  sortedChatData: ChatData[];
  setSortedChatData: React.Dispatch<React.SetStateAction<ChatData[]>>;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  currChatData: ChatData | undefined;
}) => {
  return (
    <div
      className={`${
        currChatData === undefined ? "w-[100%]" : "w-[40%]"
      } h-full flex flex-col border-white/20 border-[0.5px] rounded-lg`}
    >
      <div className="w-full h-full">
        {currChatData === undefined ? (
          <div className="flex justify-center items-center w-full h-full">
            <FileUploadDemo
              setcurrChatData={setcurrChatData}
              currChatData={currChatData}
              sortedChatData={sortedChatData}
              setSortedChatData={setSortedChatData}
            />
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-4 overflow-y-scroll h-[80vh]">
            <div>File Uploaded</div>
            {currChatData.question_hist.map((qs, subindex) =>
              qs === "" ? null : (
                <div key={subindex} className="flex flex-col gap-2">
                  {/* Question */}
                  <div className="w-full flex justify-end">
                    <span className="bg-neutral-400/50 p-2 rounded-lg border-white/20 border-[0.5px]">
                      {qs}
                    </span>
                  </div>
                  {/* Answer */}
                  <div className="w-full flex justify-start">
                    <span className="bg-zinc-700/50 rounded-lg text-wrap max-w-[10%] min-w-fit p-2 border-white/20 border-[0.5px]">
                      {currChatData.answer_hist[subindex]}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className=" flex w-full justify-center gap-4 items-center h-[15%] p-4 ">
        <div className="relative w-[100%] h-full flex items-center px-2 justify-center gap-4">
          <PlaceholdersAndVanishInputDemo currChatData={currChatData} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
