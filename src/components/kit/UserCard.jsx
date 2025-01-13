import React from 'react'
import defaultAvatar from '../../../src/assets/defaultAvatar.png'

export default function UserCard({width = "w-64", height = "h-64", imgUrl}) {
  if (!imgUrl) {
    imgUrl = defaultAvatar
  }
  return (
    <div className={`${width} ${height}  rounded-full overflow-hidden`} >
            <img 
            src={`${imgUrl}`} 
            alt="art image" 
            className='rounded-full' 
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            }} />
        </div>
  )
}
