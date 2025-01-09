import React from 'react'
import Modal from './Modal'
import { Heart } from 'lucide-react'
import LikeIcon from '../Icons/Icon'

export default function ItemModal({ isOpen, onClose }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* header */}
            <div className='w-full h-auto flex gap-3 items-center justify-between px-7 py-2 bg-yellow-200'>
                <div className='flex gap-2 items-center'>
                    <LikeIcon width={40} />
                    <p>225</p>
                </div>
                <button
                    onClick={() => { onClose() }}
                    className="text-gray-400 hover:text-gray-500"
                >
                    ✕
                </button>
            </div>

            <div className='flex w-[45rem]'>
                <div className='flex-1 bg-pink-200 flex justify-center items-center p-4'>
                    <img src="https://picsum.photos/200/300" alt="XXX" style={{
                        objectFit: 'cover',

                    }} />
                </div>
                <div className='flex-1 bg-green-300 flex flex-col justify-start p-6'>
                    <h1 className='text-[2rem]'>This is art Name</h1>
                    <p>Artist : Team Kung </p>
                    <p>Art's detail : this is my first art</p>
                </div>
            </div>
            {/* footer */}

            <div className="flex space-x-4 p-4 rounded-lg shadow-sm max-w-2xl ">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="/api/placeholder/40/40"
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Comment content */}
                <div className="flex-1">
                    {/* Username and timestamp */}
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">John Doe</span>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>

                    {/* Comment text */}
                    <p className="text-gray-700">
                        This is a sample comment. The component uses Tailwind CSS for styling
                        and includes an avatar, username, timestamp, and the comment text.
                        It's fully responsive and maintains proper spacing between elements.
                    </p>
                </div>
            </div>

            <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm max-w-2xl">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="/api/placeholder/40/40"
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Comment input form */}
                <form  className="flex-1">
                    <div className="relative">
                        <textarea
                            // value={comment}
                            // onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                        />
                        <button
                            type="submit"
                            className="absolute bottom-2 right-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            // disabled={!comment.trim()}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>

        </Modal>
    )
}
