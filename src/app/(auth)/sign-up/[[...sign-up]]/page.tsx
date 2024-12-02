import Header from '@/components/Header'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col h-screen w-screen justify-between items-center bg-gradient-to-b from-black from-0% via-cyan-900/10 via-50% to-cyan-200/10 to-100%'>
    <Header />
    <div className='h-full flex justify-center items-center'>
    <SignUp />
    </div>
  </div>
  )
}

export default page