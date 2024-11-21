import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
  } from '@clerk/nextjs'

const ChatbotHeader = () => {
  const { user } = useUser()
  return (
    <header className='flex '>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className='flex gap-4 items-center'>
          <UserButton appearance={{
            elements:{
              userButtonAvatarBox:{
                height: 50,
                width: 50
              }
            }
          }}/>
          <div className='flex flex-col'>
            <p className='text-[#ddd] text-lg font-semibold'>{user?.fullName || user?.emailAddresses[0].emailAddress}</p>
            <p className='text-[#bbb] text-sm'>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      </SignedIn>
    </header>
  )
}

export default ChatbotHeader