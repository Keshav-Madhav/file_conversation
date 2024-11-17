"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { chatdata } from "../Chatbot";


export function PlaceholdersAndVanishInputDemo({currChatUid}:{currChatUid:string}) {
  const [currQuestion, setCurrQuestion] = useState("");
  const [currAnswer, setCurrAnswer] = useState("");
  const [currChat, setCurrChat] = useState({});
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrQuestion(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("currChatuid is this:"+currChatUid);
    if(currChatUid === ""){
      setCurrChat((prev)=>({
        ...prev,
        uid: "",
        file_hash: "",
        input_query: {currQuestion},
        question_hist: [],
        answer_hist: [],
        timestamp: new Date().toISOString(),
      }))
      // chatdata.push(setCurrChat);
      console.log(chatdata);
      e.preventDefault();
    }
    else{
      chatdata.map((chat, index)=>{
        if(chat.uid === currChatUid){
          // add history to the existing chat 
          chat.question_hist.push(currQuestion);
        }
      })
    }
  };

  // //   action taken on clicking on tha start button
  // const startNewChat = () => {
  //   const newChat = {
  //     uid: "",
  //     file_hash: "",
  //     input_query: [],
  //     question_hist: [],
  //     answer_hist: [],
  //     timestamp: new Date().toISOString(), // Add current timestamp
  //   };

  //   // Update the state with the new chat
  //   // setChats((prevChats) => [...prevChats, newChat]);
  // };



  return (
    <div className="h-fit flex flex-col justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
