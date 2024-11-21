import Header from '@/components/Header'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col h-screen w-screen justify-between items-center'>
    <Header />
    <div className='h-full flex justify-center items-center'>
    <SignUp />
    </div>
  </div>
  )
}

export default page