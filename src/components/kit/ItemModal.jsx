import React from 'react'
import Modal from './Modal'

export default function ItemModal({ isOpen, onClose }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
            <div className='bg-red-200 transform hover:transform duration-300 hover:bg-red-700'> Visit ArtWork</div>
        </Modal>
    )
}
