import Header from '@/components/Header'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col h-screen w-screen justify-between items-center bg-gradient-to-b from-cyan-900/30 from-0% to-cyan-200/40 to-100%'>
      <Header />
      <div className='h-full flex justify-center items-center'>
      <SignIn />
      </div>
    </div>
  )
}

export default page