import Lottie from 'lottie-react'
import React from 'react'
import uploadAnimation from '../../assets/AnimationUpload.json'

export default function UploadLoading() {
  return (
    <div className='min-w-[26rem] flex justify-center items-center h-[30rem]'>
        <Lottie 
        animationData={uploadAnimation}
        loop
        autoPlay
        style={{width: '75%'}}
        />
    </div>
  )
}
