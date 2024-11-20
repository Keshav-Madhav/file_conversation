import React from "react";
import { PlaceholdersAndVanishInputDemo } from "./acceternitycomponents/PlaceholdersAndVanishInputDemo";
import { FileUploadDemo } from "./acceternitycomponents/FileUploadDemo";

const Chat = ({
  sortedChatData,
  setSortedChatData,
  setcurrChatData,
  currChatData,
  currActiveFile
}: {
  sortedChatData: ChatData[];
  setSortedChatData: React.Dispatch<React.SetStateAction<ChatData[]>>;
  setcurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  currChatData: ChatData | undefined;
  currActiveFile: FileData;
}) => {
  return (
    <div
      className={`${
        currChatData === undefined ? "w-[100%]" : "w-[40%]"
      } h-full flex flex-col justify-between border-white/20 border-[0.5px] rounded-lg`}
    >
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
          <>
            <p className="text-center text-2xl font-bold sticky h-12 leading-10">
              {currActiveFile.file_name}
            </p>
            <div className="px-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-9rem)]">
              {currChatData.question_hist.map((qs, subindex) => (
                <div key={subindex} className="flex flex-col gap-2">
                  {/* Question */}
                  {qs === "" ? null : (
                    <div className="w-[80%] flex justify-end self-end">
                      <span className="bg-neutral-400/50 p-2 rounded-lg border-white/20 border-[0.5px]">
                        {qs}
                      </span>
                    </div>
                  )}
                  {/* Answer */}
                  {currChatData.answer_hist[subindex] === "" ? null : (
                    <div className="w-[80%] flex justify-start">
                      <span className="bg-neutral-400/50 p-2 rounded-lg border-white/20 border-[0.5px]">
                        {currChatData.answer_hist[subindex]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="relative w-[100%] h-20 flex items-center p-4 justify-center gap-4">
              {currChatData && <PlaceholdersAndVanishInputDemo currChatData={currChatData} setCurrChatData={setcurrChatData}/>}
            </div>
          </>
        )}
    </div>
  );
};

export default Chat;
