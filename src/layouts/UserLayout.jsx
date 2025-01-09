import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import { Album, Edit, House, UserRoundPen } from 'lucide-react';
import EditProfileModal from '../components/user/EditProfileModal';


export default function UserLayout() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='relative'>
            <div
                onClick={() => navigate('/')}
                className='fixed right-0 rounded-full w-20 h-20 bg-red-500 flex justify-center items-center p-7 m-5 cursor-pointer'> <House /></div>
            <div
                onClick={() => setIsEditModalOpen(true)}
                className='fixed right-0 top-[6rem] rounded-full w-20 h-20 bg-red-500 flex justify-center items-center p-7 m-5'><UserRoundPen /></div>
            <UserHeader />
            <Outlet />
            <EditProfileModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false) }} />
        </div>
    )
}
