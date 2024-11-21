"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const firstheadingwords = [
    {
      text: "Transform",
    },
    {
      text: "Your",
    },
    { text: "Documents" },
    {
      text: "into",
    },
  ];
  const secondheadingwords = [
    {
      text: "Conversational",
      className: "font-medium text-transparent bg-clip-text bg-gradient-to-b from-cyan-900 from-10% to-cyan-500 to-100%",
    },
    {
      text: "Partners!",
    },
  ];
  return (
    <>
      <div className="flex text-wrap ">
        <TypewriterEffectSmooth line="first" words={firstheadingwords} />
      </div>
      <div className="">
        <TypewriterEffectSmooth line="second" words={secondheadingwords} />
      </div>
    </>
  );
}
