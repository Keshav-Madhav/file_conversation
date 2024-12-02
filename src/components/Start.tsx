import Image from "next/image";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { TypewriterEffectSmoothDemo } from "./acceternitycomponents/TypewriterEffectSmoothDemo";
import Link from "next/link";

const Start = () => {
  return (
    <div
      className="relative px-4 lg:px-[12rem] lg:flex 
    bg-[radial-gradient(250.0%_300.10%_at_20%_30%,rgba(0,0,0)_0%,rgba(66,92,102)_50%,rgba(112,161,180)_100%)] lg:h-[150vh]"
    >
      {/* bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)] */}
      <div className="lg:flex justify-center lg:justify-between h-[90vh] w-full">
        <div className="flex flex-col w-[60%] h-auto justify-center">
          <div className="flex flex-col gap-4">
            <h1 className=" text-3xl lg:text-5xl  font-extralight flex-wrap flex">
              <TypewriterEffectSmoothDemo />
            </h1>

            <div className="lg:text-xl my-2 font-extralight text-zinc-500">
              Upload, interact, and get instant insights from your documents
              with ease. <br />{" "}
            </div>
            <span className="font-light text-white">
              {" "}
              Our chatbot is here to help.
            </span>
            <div className="flex flex-wrap gap-4 items-center">
              <button className=" inline-flex h-12 animate-shimmer items-center justify-center rounded-lg lg:text-xl border-[1px] border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Link href="/Chat">Start Chating</Link>
              </button>
              <button className="px-8 h-12 rounded-md bg-gradient-to-b from-cyan-900 from-0% to-cyan-500 to-100% text-white font-bold transition duration-100 hover:bg-white hover:text-transparent hover:bg-clip-text hover:border-[1px] hover:border-cyan-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className=""
            src="/width_565.webp"
            width={370}
            height={550}
            alt="robot"
          />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Start;
