import React, { useEffect, useState } from 'react'
import ItemCard from '../../components/kit/ItemCard'
import ItemModal from '../../components/kit/ItemModal'
import { getPopularItems, getPopularUsers, getRandomItems } from '../../api/guest'
import UserCard from '../../components/kit/UserCard'

export default function LandingPage() {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false)

    const [popularItems, setPopularItems] = useState([])
    const [randomItems, setRandomItems] = useState([])
    const [popularArtists, setPopularArtists] = useState([])

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
    const [direction, setDirection] = useState('right');

    console.log("random item",randomItems.randomItem)
    // Get current page items
    const currentItems = popularItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleDotClick = (index) => {
        setCurrentPage(index);
    };

    console.log(popularArtists)

    return (
        <div>

            <div className='flex flex-col justify-center items-center'>
                <h2>Popular one!!</h2>
                <div className='h-[25rem] flex w-full overflow-x-scroll'>
                    <div className='bg-slate-200 flex justify-center gap-12 items-center px-10 w-full'>
                        {currentItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setIsItemModalOpen(true)}
                            >
                                <ItemCard width={'w-[16rem]'} height={'h-[14rem]'}
                                    imgUrl={item.artImg}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <ItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} />
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: pageCount }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${currentPage === index
                            ? 'bg-blue-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>

            <div className='flex flex-col justify-center items-center '>
                <h2>Random arts</h2>
                <div className='h-[50rem] flex w-full overflow-y-scroll hide-scrollbar'>
                    <div className='bg-slate-200 flex flex-wrap gap-8 items-center justify-center'>
                       {randomItems.map((item, index) => (
                        <div
                        key={index}>
                            <ItemCard width={'w-[16rem]'} height={'h-[14rem]'} imgUrl={item.artImg}/>
                        </div>
                       ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <h2>Popular Artists</h2>
                <div className='h-[25rem] flex w-full overflow-x-scroll'>
                    <div className='bg-green-200 flex gap-8 items-center px-10 '>
                       {popularArtists.map((artist, index) => (
                        <div className=''
                            key={index}>
                            <UserCard width={'w-[16rem]'} height={'h-[16rem]'} imgUrl={artist.profileImg}/>
                        </div>
                       ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
