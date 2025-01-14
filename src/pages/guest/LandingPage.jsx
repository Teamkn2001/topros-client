import React, { useEffect, useRef, useState } from 'react'
import ItemCard from '../../components/kit/ItemCard'
import ItemModal from '../../components/kit/ItemModal'
import { getPopularItems, getPopularUsers, getRandomItems } from '../../api/guest'
import UserCard from '../../components/kit/UserCard'
import UserModal from '../../components/kit/UserModal'
import SearchData from '../../components/guest/SearchData'

export default function LandingPage() {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    const [popularItems, setPopularItems] = useState([])
    const [randomItems, setRandomItems] = useState([])
    const [popularArtists, setPopularArtists] = useState([])

    const [watchItem, setWatchItem] = useState(null)
    const [watchUser, setWatchUser] = useState(null)

    const observerRefs = useRef([])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const popularItems = await getPopularItems()
                setPopularItems(popularItems.data.popularItems)

                const randomItems = await getRandomItems()
                setRandomItems(randomItems.data.randomItem)

                const popularArtists = await getPopularUsers()
                setPopularArtists(popularArtists.data.popularUsers)

                setupObserver()

                return () => {
                    observerRefs.current.forEach((ref) => {
                        if (ref) observer.unobserve(ref);
                    });
                };
            } catch (error) {
                const errMsg = error?.response?.data?.msg || error.message
                console.log(errMsg)
            }
        }
        fetchItems()


    }, [])

    const setupObserver = () => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-top');
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        setTimeout(() => {
            observerRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });
        }, 100);

        return observer;
    }

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const pageCount = Math.ceil(popularItems.length / itemsPerPage);

    const currentItems = popularItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleDotClick = (index) => {
        setCurrentPage(index);
    };

    return (
        <div className='pt-[5rem] pb-[2rem]'>

            <div>
                <div className='flex flex-col justify-center items-center mt-3 '>
                    <h1 className='header1'>Popular one !!</h1>
                    <div className='min-h-[20rem] flex w-full overflow-x-scroll hide-scrollbar'>
                        <div className='flex justify-center gap-12 items-center px-10 w-full '>
                            {currentItems.map((item, index) => (
                                <div
                                    className={`border-[8px] border-[#F77000] p-2 border-opacity-90 hover:border-[#F74B00] cursor-pointer m-2 duration-300 rounded-sm slide-top`}
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

                <div className="flex items-center justify-center gap-2 h-auto mt-[-1rem] mb-4 ">
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

            <div className='flex flex-col justify-center items-center gap-3 p-4'>
                <h2 className='header1'>Random arts</h2>
                <div className='h-auto flex w-full overflow-y-scroll hide-scrollbar'>
                    <div className='flex flex-wrap gap-8 items-center justify-center'>
                        {randomItems.map((item, index) => (
                            <div
                                ref={el => observerRefs.current[index] = el}
                                className='border-[8px] border-[#F7BB00] p-2 border-opacity-90 hover:border-[#F74B00] cursor-pointer m-2 duration-300 rounded-sm'
                                onClick={() => { setIsItemModalOpen(true), setWatchItem(item) }}
                                key={index}>
                                <ItemCard width={'w-[16rem]'} height={'h-[14rem]'} imgUrl={item.artImg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-16 p-6'>
                <h2 className='header1'>Popular Artists</h2>
                <div className='h-auto flex'>
                    <div className='flex flex-wrap gap-8 items-center justify-center px-14 w-full'>
                        {popularArtists.map((artist, index) => (
                            <div
                                ref={el => observerRefs.current[index] = el}
                                className='rounded-full w-[17rem] h-[17rem] overflow-hidden flex justify-center items-center bg-gradient-to-r from-red-400 via-yellow-400 to-orange-200 hover:from-red-500 hover:via-yellow-500 hover:to-orange-300 cursor-pointer duration-300'
                                onClick={() => { setIsUserModalOpen(true), setWatchUser(artist) }}
                                key={index}>
                                <UserCard width={'w-[16rem]'} height={'h-[16rem]'} imgUrl={artist?.profileImage
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
