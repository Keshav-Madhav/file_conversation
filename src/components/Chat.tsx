import React, { useEffect, useState } from "react";
import { div } from "framer-motion/client";
import { Paperclip } from "lucide-react";
import { PlaceholdersAndVanishInputDemo } from "./acceternitycomponents/PlaceholdersAndVanishInputDemo";
import { chatdata } from "./Chatbot";


const Chat=({currChatUid}:{currChatUid:string}) => {
  return (
    <div className="w-[40%] h-full flex flex-col border-white/20 border-[0.5px] rounded-lg">
      <div className="w-full h-full">
        {chatdata.map((chat, index) => {
          if (chat.uid === currChatUid) {
            return (
              <div className="p-4 flex flex-col gap-4" key={index}>
                {chat.question_hist.map((qs, subindex) => (
                  <div key={subindex} className="flex flex-col gap-2">
                    <div className="w-full flex justify-end ">
                      <span className="bg-neutral-400/50 p-2 rounded-lg border-white/20 border-[0.5px]">
                        {qs}
                      </span>
                    </div>
                    <div className="w-full flex justify-start ">
                      <span className="bg-zinc-700/50 rounded-lg text-wrap max-w-[10%] min-w-fit p-2 border-white/20 border-[0.5px]">
                        {chat.answer_hist[subindex]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          if (currChatUid === "") {
            <div> click to start a new chat </div>;
          }
          return null; // Return null for chats not in use
        })}
      </div>
      {/* Input section */}
      <div className=" flex w-full justify-center gap-4 items-center h-[15%] p-4 ">
        <div className="relative w-[100%] h-full flex items-center px-2 justify-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center ">
            <Paperclip className="text-zinc-400" />
          </button>
          {/* <input className='w-full h-full bg-zinc-700/50 pl-16 border-white/20 border-[0.5px] rounded-full placeholder:text-zinc-400 active:bg-zinc-700 focus:border-none ' type="text" name="" id="" placeholder='Enter your query here....'/> */}
          <PlaceholdersAndVanishInputDemo currChatUid={currChatUid}/>
        </div>
        {/* <button className='w-10 h-10 rounded-full bg-slate-200'></button> */}
      </div>
    </div>
  );
};

export default Chat;
