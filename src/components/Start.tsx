import Image from 'next/image';
import React from 'react'
import { BackgroundBeams } from "./ui/background-beams";
import {TypewriterEffectSmoothDemo} from "./acceternitycomponents/TypewriterEffectSmoothDemo";
import Link from 'next/link';

const Start = () => {
  return (
    <div className='relative px-4 lg:px-[12rem] lg:flex 
    bg-gradient-to-b 
    from-black/0 from-10%
    to-black to-100% lg:h-[80vh]'>
      <div className='flex flex-col w-[75%] h-auto justify-center'>
        <div>
        <h1 className=' text-3xl lg:text-5xl  font-extralight flex-wrap flex'>
        <TypewriterEffectSmoothDemo />
        </h1>

        <div className='lg:text-xl my-2 font-extralight text-zinc-500'>Have a question about your symptoms? Need advice on managing a condition? Or just want to learn more about your health? <br /> <span className='font-light text-white'> Our chatbot is here to help.</span></div>
        <button className=" mt-7 inline-flex h-12 animate-shimmer items-center justify-center rounded-lg lg:text-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <Link href="/Chat">Start Chating</Link> 
        </button>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <Image className='scale-x-[-1]' src='/robotimg.png' width={550} height={550} alt='robot' />
      </div>
      <BackgroundBeams />
    </div>
  )
}

export default Start;