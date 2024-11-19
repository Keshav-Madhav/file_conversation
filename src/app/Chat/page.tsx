'use client'

import { useUser } from "@clerk/nextjs";
import Chatbot from "@/components/Chatbot";
import React from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>;
  }

  const email = user?.primaryEmailAddress?.emailAddress || "No email found";
  const uid = user?.id || "No UID found";

  async function addUser() {
    const userobject = {
      email: {email},
      clerkuid: {uid},
      chats: [],
    };

    try {
      const docRef = doc(db, "userdata",uid); 
      await setDoc(docRef, userobject);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  }
  addUser();

  return <Chatbot />;
};

export default page;
