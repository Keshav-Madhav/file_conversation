"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "MEDIFY",
      className: "font-medium text-[#E4D486]",
    },
    {
      text: "Chatbot!",
    },
  ];
  return (
    <div className="flex">
      <TypewriterEffectSmooth words={words} />
      
    </div>
  );
}
