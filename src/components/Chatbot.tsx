import React from 'react'

const Chatbot = () => {
  return (
    <div className='h-screen w-full flex gap-5 justify-center items-center p-8 '>
        <div className='w-[20%] h-full bg-slate-700'></div>
        <div className='w-[40%] h-full flex flex-col bg-slate-300'>
            {/* Chat section */}
            <div className=' w-full h-full bg-slate-500'></div>
            {/* Input section */}
            <div className=' flex w-full justify-center gap-4 items-center h-[15%] p-4 bg-slate-400'>
                <div className='w-[90%] h-full bg-slate-600 flex items-center rounded-full px-2'>
                    <button className='w-10 h-10 rounded-full bg-slate-200'></button>
                </div>
                <button className='w-10 h-10 rounded-full bg-slate-200'></button>
            </div>
        </div>
        <div className='w-[40%] h-full flex flex-col bg-slate-300'>
            {/* Document */}
            <div className='h-full w-full bg-slate-400'></div>
        </div>
    </div>
  )
}

export default Chatbot