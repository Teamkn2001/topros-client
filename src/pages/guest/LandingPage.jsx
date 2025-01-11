import React, { useEffect, useState } from 'react'
import ItemCard from '../../components/kit/ItemCard'
import ItemModal from '../../components/kit/ItemModal'
import { getPopularItems, getPopularUsers, getRandomItems, searchItems, searchUsers } from '../../api/guest'
import UserCard from '../../components/kit/UserCard'
import UserModal from '../../components/kit/UserModal'
import { toast } from 'react-toastify'
import SearchData from '../../components/guest/SearchData'

export default function LandingPage() {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    const [popularItems, setPopularItems] = useState([])
    const [randomItems, setRandomItems] = useState([])
    const [popularArtists, setPopularArtists] = useState([])

    const [watchItem, setWatchItem] = useState(null)
    const [watchUser, setWatchUser] = useState(null)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const popularItems = await getPopularItems()
                setPopularItems(popularItems.data.popularItems)

                const randomItems = await getRandomItems()
                setRandomItems(randomItems.data.randomItem)

                const popularArtists = await getPopularUsers()
                setPopularArtists(popularArtists.data.popularUsers)

            } catch (error) {
                const errMsg = error?.response?.data?.msg || error.message
                console.log(errMsg)
            }
        }
        fetchItems()
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const pageCount = Math.ceil(popularItems.length / itemsPerPage);

    // Get current page items
    const currentItems = popularItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleDotClick = (index) => {
        setCurrentPage(index);
    };

    const [searchData, setSearchData] = useState('')
    const [searchItemResult, setSearchItemResult] = useState(null)
    const [searchUserResult, setSearchUserResult] = useState(null)

    const handleSearchChange = (e) => {
        setSearchData(e.target.value)
    }

    const handleArtSearch = async () => {
        if (!searchData) return
        setSearchItemResult(null)
        setSearchUserResult(null)
        try {
            const searchResult = await searchItems(searchData)
            setSearchItemResult(searchResult.data.items)
        } catch (error) {
            const errMsg = error?.response?.data?.message || error.message
            toast.error(errMsg)
        }
    }

    const handleUserSearch = async () => {
        if (!searchData) return
        setSearchItemResult(null)
        setSearchUserResult(null)
        try {
            const searchResult = await searchUsers(searchData)
            setSearchUserResult(searchResult.data.users)
        } catch (error) {
            const errMsg = error?.response?.data?.message || error.message
            toast.error(errMsg)
        }
    }

    return (
        <div className='pt-[5rem]'>

            <div className=''>
                <div className='flex flex-col justify-center items-center'>
                    <h2>Popular one!!</h2>
                    <div className='min-h-[22rem]  flex w-full overflow-x-scroll'>
                        <div className=' flex justify-center gap-12 items-center px-10 w-full'>
                            {currentItems.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}
                                >
                                    <ItemCard width={'w-[16rem]'} height={'h-[14rem]'}
                                        imgUrl={item.artImg}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 h-auto mt-[-2rem] mb-4">
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${currentPage === index
                                ? 'bg-blue-600'
                                : 'bg-gray-300 hover:bg-gray-400 duration-200'
                                }`}
                        />
                    ))}
                </div>

            </div>

            <SearchData
                setIsItemModalOpen={setIsItemModalOpen}
                setIsUserModalOpen={setIsUserModalOpen}
                setWatchItem={setWatchItem}
                setWatchUser={setWatchUser}
            />


            {/* <div className='w-full h-auto bg-blue-500 mb-10 pt-3'>
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

                <div className='w-full flex justify-center items-center p-4'>
                    <div className=' max-h-[50rem] flex flex-wrap items-center justify-center gap-5 overflow-y-auto hide-scrollbar'>
                        {searchItemResult &&
                            searchItemResult.map((item, index) => (
                                <div className='flex flex-col items-center justify-center' key={index}
                                    onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}>
                                    <ItemCard width={'w-[16rem]'} height={'h-[14rem]'} imgUrl={item.artImg} />
                                </div>))
                        }

                        {searchUserResult && searchUserResult.map((user, index) => (
                            <div onClick={() => { setIsUserModalOpen(true), setWatchUser(user) }}>
                                <UserCard width={'w-[16rem]'} height={'h-[16rem]'} imgUrl={user.profileImage} />
                            </div>))}
                    </div>
                </div>
            </div> */}

            <div className='flex flex-col justify-center items-center bg-red-400 p-4'>
                <h2>Random arts</h2>
                <div className='h-[50rem] flex w-full overflow-y-scroll hide-scrollbar'>
                    <div className='flex flex-wrap gap-8 items-center justify-center'>
                        {randomItems.map((item, index) => (
                            <div
                                onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}
                                key={index}>
                                <ItemCard width={'w-[16rem]'} height={'h-[14rem]'} imgUrl={item.artImg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <h2>Popular Artists</h2>
                <div className='h-[25rem] flex w-full overflow-x-scroll '>
                    <div className='bg-green-200 flex gap-8 items-center px-6 w-full'>
                        {popularArtists.map((artist, index) => (
                            <div
                                className=''
                                onClick={() => { setIsUserModalOpen(true), setWatchUser(artist) }}
                                key={index}>
                                <UserCard width={'w-[16rem]'} height={'h-[16rem]'} imgUrl={artist.profileImage
                                } />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} item={watchItem} />
            <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} user={watchUser} />
        </div>
    )
}
