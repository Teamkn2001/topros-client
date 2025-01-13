import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import UserCard from '../kit/UserCard'
import roof from '../../assets/roof.svg'

export default function UserHeader() {
  const user = useUserStore(pull => pull.user)
  console.log(user)
  return (
    <div className='flex items-center h-[18rem]' 
    style={{backgroundImage: `url(${roof})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

      <div className='w-[30%] h-full flex flex-col items-center justify-center' >
        <div className='rounded-full w-[13rem] h-[13rem] overflow-hidden flex justify-center items-center bg-gradient-to-r from-red-500 via-yellow-400 via-yellow-300 to-orange-200'> 
          <UserCard width={'w-[12rem]'} height={'h-[12rem]'} imgUrl={user.profileImage}/>
        </div>
      </div>

      <div className='w-[60%] h-full content-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[3rem] text-white font-bold'>{user?.username ? user.username : user.email}</h1>
          <p className='text-xl text-white '>{user.email ? user.email : "no data"}</p>
          <p className='text-xl text-white '>About me : {user?.bio ? user.bio : "user is bored to write something for now"}</p>
        </div>
      </div>
    </div>
  )
}
