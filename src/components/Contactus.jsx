import React from 'react'

const Contactus = () => {
  return (
    <div className='relative bg-[radial-gradient(50.0%_80.0%_at_100%_100%,rgba(112,161,180,0.40)_0%,rgba(35,50,56)_40%,rgba(0,0,0)_80%)] h-[110vh] w-full flex items-end'>
        <div className='h-[70vh] w-full flex justify-between items-center px-40 gap-16'>
            <h1 className='text-5xl font-light'>Got Questions? <br /> we would love to take you
            through <br /> our product</h1>
            <button className='text-2xl font-medium bg-gradient-to-b from-cyan-900 from-0% to-cyan-500 to-100% text-white transition duration-100 hover:bg-white hover:text-transparent hover:bg-clip-text hover:border-[1px] hover:border-cyan-500 text-nowrap px-8 py-2 rounded-lg'>Contact us</button>
        </div>
        <div className="absolute w-[500px] h-[500px] -left-[250px] bottom-20 bg-[radial-gradient(100.0%_100.10%_at_50%_50%,rgba(112,161,180,0.20)_0%,rgba(0,0,0,0.00)_50%)]"></div>
    </div>
  )
}

export default Contactus