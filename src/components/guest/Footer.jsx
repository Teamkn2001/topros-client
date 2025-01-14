import React from 'react'

export default function Footer() {
  return (
    <div className='flex h-[13rem] bg-[#F7BB00]'>
        <div className='flex items-center w-1/2 pl-[5rem] '>
            <h1 className='text-2xl font-bold'>Let store your creativity here</h1>
        </div>
        <div className='flex flex-col justify-center w-1/2 gap-1'>
            <h1 className='text-2xl font-bold'>Contact</h1>
            <p className='text-lg font-light'>Email : sudtipong.fullstack@gmail.com </p>
            <p className='text-lg font-light'>this website creating for learning propose only</p>
        </div>
    </div>
  )
}
