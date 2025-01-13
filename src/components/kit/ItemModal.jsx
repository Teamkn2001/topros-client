import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { CircleChevronDown, CircleChevronUp, Heart, Send } from 'lucide-react'
import { LikeIcon, LikeGrayIcon } from '../Icons/Icon'
import { toast } from 'react-toastify'
import { getItemById } from '../../api/guest'
import ItemCard from './ItemCard'
import CommentBox from '../subModal/CommentBox'
import useUserStore from '../../stores/userStore'
import { addComment, likeItemToggle } from '../../api/user'
import defaultAvatar from '../../assets/defaultAvatar.png'

export default function ItemModal({ isOpen, onClose, item }) {
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [itemData, setItemData] = useState(null)
    const [comment, setComment] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const user = useUserStore(pull => pull.user)

    const handleClickLike = async () => {
        if (!user) {
            return toast.error('please login to like')
        }
        if (isLiked) {
            try {
                await likeItemToggle(item.id)
            } catch (error) {
                const err = error?.response?.data?.msg || error.message
                toast.error(err)
            }
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
            try {
                await likeItemToggle(item.id)
            } catch (error) {
                const err = error?.response?.data?.msg || error.message
                toast.error(err)
            }
        }
        setIsLiked(!isLiked)
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const formData = { text: comment }

        const mockUser = {
            username: user.username,
            profileImage: user.profileImage
        }

        const newDate = new Date()
        const displayDate = newDate.toLocaleString('en-GB')
        const dateData = displayDate.split(',')[1].slice(0, 6) +' ' + displayDate.split(',')[0]

        const newComment = {
            text: comment,
            author: mockUser,
            createdAt: dateData
        }
        setItemData(prev => ({ ...prev, Comment: [newComment, ...prev.Comment] }))

        try {
            const rs = await addComment(item.id, formData)
            setComment('')
        } catch (error) {
            const err = error?.response?.data?.msg || error.message
            toast.error(err)
        }
    }

    useEffect(() => {
        if (item) {
            const fetchItems = async () => {
                try {
                    const fetchedItem = await getItemById(item.id)
                    const itemData = fetchedItem.data.item
              
                    const categoryFix = {
                        ...fetchedItem,
                        data : {
                            ...fetchedItem.data,
                            item : {
                                ...fetchedItem.data.item,
                                category : fetchedItem.data.item.category.replace('_', ' '),
                                Comment : fetchedItem.data.item.Comment.map((comment) => {
                                    const newDate = new Date(comment.createdAt)
                                    const displayDate = newDate.toLocaleString('en-GB')
                                    const dateData = displayDate.split(',')[1].slice(0, 6) +' ' + displayDate.split(',')[0]
                                    return {
                                        ...comment,
                                        createdAt : dateData}
                                })
                            }
                        } 
                    }
                    setItemData(categoryFix.data.item)

                    setLikeCount(fetchedItem.data.item.Like.length)
                    if (user) {
                        const isLike = fetchedItem.data.item.Like.find(like => like.userId === user.id)
                        if (isLike) {
                            setIsLiked(true)
                        }
                    }
                } catch (error) {
                    const err = error?.response?.data?.msg || error.message
                    toast.error(err)
                }
            }
            fetchItems()
        }
        return setIsLiked(false), setIsCommentOpen(false)
    }, [item])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* header */}
            <div className='w-full h-auto flex gap-3 items-center justify-between px-7 py-2 bg-yellow-200 '>
                <button
                    onClick={() => handleClickLike()}
                    className='flex gap-2 items-center '>
                    {isLiked ? <LikeIcon width={40} /> : <LikeGrayIcon width={40} />}
                    <p>{likeCount}</p>
                </button>

                <button
                    onClick={() => { onClose(), setIsCommentOpen(false) }}
                    className="text-gray-400 hover:text-gray-500"
                >
                    ✕
                </button>
            </div>

            {isCommentOpen
                ? null
                : <div className='flex w-[45rem]'>
                    <div className='flex-1 bg-pink-200 flex justify-center items-center p-4'>
                        <ItemCard imgUrl={item?.artImg} />
                    </div>
                    <div className='flex-1 bg-green-300 flex flex-col justify-start p-6'>
                        <h1 className='text-[2rem]'>{itemData?.artName || 'art name'}</h1>
                        <p>Artist : {itemData?.owner?.username} </p>
                        <p>Detail : {itemData?.artDescription || 'user bored to write now'}</p>
                        <p>type : {itemData?.category || 'user bored to write now'}</p>
                    </div>
                </div>
            }

            <div className='w-[45rem]'>
                <div className='w-full text-center py-1 '>
                    <button onClick={() => setIsCommentOpen(!isCommentOpen)}>
                        {isCommentOpen
                            ? <div className='flex gap-2'>
                                <p>close Comments</p>
                                <CircleChevronDown />
                            </div>
                            : <div className='flex gap-2'>
                                <p>watch comment</p>
                                <CircleChevronUp />
                            </div>
                        }
                    </button>
                </div>

                <div className={`bg-green-300 ${isCommentOpen ? 'min-h-[20rem] max-h-[35rem]' : 'max-h-[15rem]'} overflow-y-auto `}>
                    {itemData?.Comment.map((comment, index) => (
                        <div key={index}>
                            <CommentBox comment={comment} />
                        </div>
                    ))
                    }
                </div>

                {/* this is input form */}
                {user
                    ? <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm max-w-3xl">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={user?.profileImage || defaultAvatar}
                                    alt="User avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Comment input form */}
                        <form className="w-full" onSubmit={handleCommentSubmit}>
                            <div className="flex gap-1 ">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-[80%] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                                />
                                <div className='w-[20%] flex justify-center items-center'>
                                    <button
                                        type="submit"
                                        className=" w-[4rem] h-[4rem] bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center  "
                                        disabled={!comment.trim()}
                                    >
                                        <Send />
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                    : <div className='w-full h-16 content-center text-center bg-orange-500'>
                        <p className='text-xl font-bold'>please login to comment</p>
                    </div>
                }

            </div>
        </Modal>
    )
}
