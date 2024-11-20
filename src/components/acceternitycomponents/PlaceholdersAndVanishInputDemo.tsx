"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import askQuestionAPI from "@/lib/apis/askQuestionAPI";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const db = getFirestore(app);

export function PlaceholdersAndVanishInputDemo({
  currChatData,
  setCurrChatData,
}: {
  currChatData: ChatData;
  setCurrChatData: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
}) {
  const router = useRouter();
  const [currQuestion, setCurrQuestion] = useState("");
  const { user } = useUser();
  if (!user) {
    router.push("/");
  }

  const placeholders = [
    "Can you summarize this document?",
    "What is this document about?",
    "What is written on the second page?",
    "Create a summary of the first paragraph.",
    "List the key points of the document.",
  ];

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

      setCurrChatData((prev) => ({ ...prev!, question_hist: newQuestionHist }));

      // Call API
      const response = await askQuestionAPI(
        currChatData.file_hash,
        user!.id,
        currQuestion,
        currChatData.question_hist || [],
        currChatData.answer_hist || []
      );

      let newAnswerHist;
      if (response.status === 200) {
        newAnswerHist = [...(currChatData.answer_hist || []), response.data.answer];
      } else {
        newAnswerHist = [...(currChatData.answer_hist || []), "Error in fetching answer."];
      }
      await updateDoc(docRef, {
        answer_hist: newAnswerHist,
      });

      setCurrChatData((prev) => ({ ...prev!, answer_hist: newAnswerHist }));

      setCurrQuestion("");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div className="h-fit w-full flex flex-col justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setCurrQuestion(e.target.value)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
