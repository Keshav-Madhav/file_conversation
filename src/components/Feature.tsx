import React from 'react'

const Feature = () => {
  return (
    <div className='flex justify-between px-20'>
        <div className='w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-tl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% -rotate-[20deg] p-1'>
            <div className='bg-black w-full h-full rounded-xl'></div>
        </div>
        <div className='w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-br from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% rotate-[20deg] p-1'>
            <div className='bg-black w-full h-full rounded-xl'></div>
        </div>
        <div className='w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-tl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% -rotate-[20deg] p-1'>
            <div className='bg-black w-full h-full rounded-xl'></div>
        </div>
        <div className='w-[20vw] h-[50vh] rounded-2xl bg-gradient-to-bl from-[#5fc8d1] from-0% via-[#256d8b] via-50% to-[#28373d] to-100% rotate-[20deg] p-1'>
            <div className='bg-black w-full h-full rounded-xl'></div>
        </div>
    </div>
  )
}

export default Feature