import Lottie from 'lottie-react'
import React from 'react'
import searchAnimation from '../../assets/AnimationSearching.json'

export default function SearchingLoad() {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='max-w-[30rem] flex justify-center items-center'>
                <Lottie
                    animationData={searchAnimation}
                    loop
                    autoPlay
                    style={{ width: '75%' }}
                />
            </div>
        </div>
    )
}
