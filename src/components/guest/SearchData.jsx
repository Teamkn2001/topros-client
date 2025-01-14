import React, { useState } from 'react'
import { searchItems, searchUsers } from '../../api/guest'
import ItemCard from '../kit/ItemCard'
import UserCard from '../kit/UserCard'
import SearchingLoad from '../kit/SearchingLoad'

export default function SearchData({
    setIsItemModalOpen,
    setIsUserModalOpen,
    setWatchItem,
    setWatchUser
}) {
    const [searchData, setSearchData] = useState('')
    const [searchItemResult, setSearchItemResult] = useState(null)
    const [searchUserResult, setSearchUserResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearchChange = (e) => {
        setSearchData(e.target.value)
    }

    const handleArtSearch = async () => {
        if (!searchData) return
        setIsLoading(true)
        setSearchItemResult(null)
        setSearchUserResult(null)
        try {
            const searchResult = await searchItems(searchData)
            setSearchItemResult(searchResult.data.items)
        } catch (error) {
            const errMsg = error?.response?.data?.message || error.message
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    const handleUserSearch = async () => {
        if (!searchData) return
        setIsLoading(true)
        setSearchItemResult(null)
        setSearchUserResult(null)
        try {
            const searchResult = await searchUsers(searchData)
            setSearchUserResult(searchResult.data.users)
        } catch (error) {
            const errMsg = error?.response?.data?.message || error.message
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className='w-full h-auto  mb-10 pt-3'>
            <div className='flex gap-4 items-center justify-center my-5'>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        onChange={handleSearchChange}
                        type="text"
                        className="grow"
                        placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                <button
                    onClick={handleArtSearch}
                    className="btn btn-outline">Art name
                </button>
                <button
                    onClick={handleUserSearch}
                    className="btn btn-outline btn-primary">User
                </button>
            </div>

            {isLoading
                ? (<SearchingLoad />)
                : (<>
                    {!searchItemResult && !searchUserResult && (
                        <div className='flex justify-center items-center min-h-[5rem] '><h2 className='text-2xl font-semibold text-red-500'>no item or user found</h2></div>)
                    }

                    <div className='w-full flex justify-center items-center p-4'>
                        <div className=' max-h-[50rem] flex flex-wrap justify-center gap-5 overflow-y-auto hide-scrollbar'>
                            {searchItemResult &&
                                searchItemResult.map((item, index) => (
                                    <div
                                        className='border-[8px] border-[#4099B7] p-2 border-opacity-90 hover:border-[#F74B00] cursor-pointer m-2 duration-300 rounded-sm scale-up-center-userPopUp'
                                        key={index}
                                        onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}>
                                        <ItemCard width={'w-[16rem]'} height={'h-[14rem]'} imgUrl={item.artImg} />
                                    </div>))
                            }

                            {searchUserResult && searchUserResult.map((user, index) => (
                                <div
                                    className='rounded-full w-[17rem] h-[17rem] overflow-hidden flex justify-center items-center bg-gradient-to-r from-red-400 via-yellow-400 to-orange-200 hover:from-red-500 hover:via-yellow-500 hover:to-orange-300 cursor-pointer duration-300 scale-up-center-userPopUp'
                                    key={index}
                                    onClick={() => { setIsUserModalOpen(true), setWatchUser(user) }}>
                                    <UserCard width={'w-[16rem]'} height={'h-[16rem]'} imgUrl={user.profileImage} />
                                </div>))}
                        </div>
                    </div>
                </>)}


        </div>
    )
}
