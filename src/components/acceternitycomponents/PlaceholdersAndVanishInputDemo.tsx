"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import askQuestionAPI from "@/lib/apis/askQuestionAPI";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "@/firebase";
import { useUser } from "@clerk/nextjs";

const db = getFirestore(app);

interface ChatData {
  id: string;
  file_hash: string;
  input_query: string;
  question_hist: string[];
  answer_hist: string[];
  timestamp: string;
  inuse: boolean;
}

export function PlaceholdersAndVanishInputDemo({
  currChatData,
}: {
  currChatData: ChatData | undefined;
}) {
  const [currQuestion, setCurrQuestion] = useState("");
  const { user } = useUser();
  const uid = user?.id || "No UID found";

  const placeholders = [
    "Can you summarize this document?",
    "What is this document about?",
    "What is written on the second page?",
    "Create a summary of the first paragraph.",
    "List the key points of the document.",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrQuestion(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currChatData) {
      console.error("No current chat data available.");
      return;
    }

    try {
      const docQuery = query(
        collection(db, "chatdata"),
        where("id", "==", currChatData.id)
      );
      const querySnapshot = await getDocs(docQuery);

      if (querySnapshot.empty) {
        console.error("No matching document found for the given chat ID.");
        return;
      }

      const docRef = querySnapshot.docs[0].ref;

      // Update the document with the new question
      const newQuestionHist = [...(currChatData.question_hist || []), currQuestion];
      await updateDoc(docRef, {
        input_query: currQuestion,
        question_hist: newQuestionHist,
      });

      // Call API
      const response = await askQuestionAPI(
        "DwxQP1aK7XbJKtFnzjaJ",
        uid,
        currQuestion,
        currChatData.question_hist || [],
        currChatData.answer_hist || []
      );

      if (response.status === 200) {
        const newAnswerHist = [...(currChatData.answer_hist || []), response.data.answer];
        await updateDoc(docRef, {
          answer_hist: newAnswerHist,
        });

        setCurrQuestion("");
      } else {
        console.error("API call failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div className="h-fit w-full flex flex-col justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
