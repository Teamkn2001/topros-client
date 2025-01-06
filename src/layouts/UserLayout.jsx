import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import { Album, House } from 'lucide-react';


export default function UserLayout() {
   const navigate = useNavigate()

    return (
        <div className='relative'>
            <div 
            onClick={() => navigate('/')}
            className='fixed right-0 rounded-full w-20 h-20 bg-red-500 flex justify-center items-center p-7 m-5'> <House /></div>
            <div 
            className='fixed right-0 top-[6rem] rounded-full w-20 h-20 bg-red-500 flex justify-center items-center p-7 m-5'><Album /></div>
            <UserHeader />
            <Outlet />
        </div>
    )
}
