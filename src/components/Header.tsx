import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky  z-50 px-20 w-full flex justify-between items-center border-b-[1px] border-[#5fc8d1] shadow-sm shadow-[#5fc8d1] p-4 gap-10">
      {/* icon */}
      <h1 className="text-[#5fc8d1] text-3xl">File Talker</h1>
      <div className="flex gap-8">
        {/* pages */}
        <ul className="flex gap-8 items-center text-lg">
          <li>
            <Link href="/Chat">Chat</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        {/* signin/profile */}
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
