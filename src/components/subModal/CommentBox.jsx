import React from 'react'
import defaultAvatar from '../../assets/defaultAvatar.png'

export default function CommentBox({comment}) {
    return (
        <div className="flex space-x-4 p-4  max-w-2xl bg-yellow-300">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                        src={comment?.author?.profileImage || defaultAvatar}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {/* Comment content */}
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.author.username}</span>
                    <span className="text-sm text-gray-500">{comment.createdAt}</span>
                </div>

                {/* Comment text */}
                <p className="text-gray-700">
                    {comment.text || "comment is deleted"}
                </p>
            </div>
        </div>
    )
}
