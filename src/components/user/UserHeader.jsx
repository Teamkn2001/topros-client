import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import UserCard from '../kit/UserCard'

export default function UserHeader() {
  const user = useUserStore(pull => pull.user)
  
  const [userData , setUserData] = useState({
      username: "user.username",
      email: "user.email",
      profileImage: "user.profileImage",
      bio: "user.bio"
  })

  useEffect( () => {
    if(user) {
      setUserData({
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio
      })
    }
  }, [user])

  return (
    <div className='flex items-center h-[16rem] bg-yellow-200'>

      <div className='w-[30%] h-full flex flex-col items-center justify-center'>
        <div className='rounded-full w-[12rem] h-[12rem] bg-white overflow-hidden flex justify-center items-center'>
          <UserCard width={'w-[12rem]'} height={'h-[12rem]'} imgUrl={userData.profileImage}/>
        </div>
      </div>

      <div className='w-[60%] h-full content-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[2rem]'>{userData?.username ? userData.username : userData.email}</h1>
          <p>{userData.email ? userData.email : "no data"}</p>
          <p>About me : {userData?.bio ? userData.bio : "user is bored to write something for now"}</p>
        </div>
      </div>
    </div>
  )
}
