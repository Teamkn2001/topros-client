import React, { useState } from 'react'
import Modal from './Modal'
import UserCard from './UserCard'
import ItemCard from './ItemCard'
import { LikeIcon } from '../Icons/Icon'
import ItemModal from './ItemModal'

export default function UserModal({ isOpen, onClose, user }) {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false)
    const [watchItem, setWatchItem] = useState(null)
    const isNoItem = user?.ownedItems.length === 0

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            <div className="w-full flex gap-3 items-center justify-end px-7 py-2 rounded-lg">
                <button onClick={onClose} className="text-2xl text-gray-500">
                    ✕
                </button>
            </div>

            <div className="w-max-[45rem] min-w-[35rem] my-4 mx-12 ">
                <div className="flex items-center space-x-4 gap-8">
                    <UserCard width={'w-[10rem]'} height={'h-[10rem]'} imgUrl={user?.profileImage} />
                    <div className='flex flex-col justify-center items-start gap-1 max-w-[50rem]'>
                        <h2 className="text-5xl font-bold">{user?.username}</h2>
                        <p className='font-semibold text-gray-400'>{user?.email}</p>
                        <p className='text-xl font-light'>{user?.bio || ''}</p>
                        <div className='flex gap-2'>
                            <LikeIcon width={30} />
                            <p className='text-lg font-semibold text-red-500'>{user?.totalLikes || "0"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isNoItem &&
                <div className='flex bg-slate-200 justify-center items-center h-[10rem] mt-10'>
                    <p>user have no item for now</p>
                </div>
            }

            <div className='flex w-full max-h-[28rem] overflow-y-scroll justify-center py-5 px-5'>
                <div className='flex flex-wrap gap-8 w-full justify-center'>
                    {user?.ownedItems.map((item, index) => (
                        <div
                            onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}
                            key={index}>
                            <ItemCard width={'w-[12rem]'} height={'h-[12rem]'} imgUrl={item.artImg} />
                        </div>
                    ))}
                </div>
            </div>

            <ItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} item={watchItem} />
        </Modal>
    )
}
