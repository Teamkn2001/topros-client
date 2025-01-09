import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import UserCard from '../kit/UserCard'

export default function UserHeader() {
  const user = useUserStore(pull => pull.user)
  
  return (
    <div className='flex items-center h-[16rem] bg-yellow-200'>

      <div className='w-[30%] h-full flex flex-col items-center justify-center'>
        <div className='rounded-full w-[12rem] h-[12rem] bg-white overflow-hidden flex justify-center items-center'>
          <UserCard width={'w-[12rem]'} height={'h-[12rem]'} imgUrl={user.profileImage}/>
        </div>
      </div>

      <div className='w-[60%] h-full content-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[2rem]'>{user?.username ? user.username : user.email}</h1>
          <p>{user.email ? user.email : "no data"}</p>
          <p>About me : {user?.bio ? user.bio : "user is bored to write something for now"}</p>
        </div>
      </div>
    </div>
  )
}
