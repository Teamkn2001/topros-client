import React, { useState } from 'react'
import defaultImage from '../../../src/assets/default-Image.png'

export default function ItemCard({width = "w-64", height = "h-64", imgUrl = defaultImage}) {
    return (
        <div className={`${width} ${height} bg-slate-100 `} >
            <img src={`${imgUrl}`} alt="art image" style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            }} />
        </div>
    )
}
