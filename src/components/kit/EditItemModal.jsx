import React, { useState } from 'react'
import Modal from './Modal'
import { ImagePlus } from 'lucide-react'

export default function EditItemModal({ isOpen, onClose}) {

    const [ previewImage, setPreviewImage ] = useState(null)

       const handleImageUpload = (e) => {
            const file = e.target.files[0]
            if (file) {
                setItemForm(prev => ({ ...prev, image: file }))
                // create a preview
                const previewUrl = URL.createObjectURL(file)
                setPreviewImage(previewUrl)
            }
        }
    
        const handleInputChange = (e) => {
            console.log(e.target)
            setItemForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }

        const handleRemoveImg = () => {
            console.log("function remove img")
        }
    
        const handleSubmit = (e) => {
            try {
                console.log("itemFrom that will be sent", itemFrom)
                e.preventDefault()
            } catch (error) {
                const errMsg = error?.response?.data?.msg || error.message
                toast.error(errMsg)
            }
        }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
<div className="min-w-[26rem] max-w-md p-6 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">

                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 flex flex-col justify-center">

                    <div className='w-full flex justify-center items-center gap-4'>
                        <div className='w-[14rem] h-[14rem] bg-slate-100 rounded-md border-2 border-black border-dashed flex justify-center items-center '>
                            {previewImage
                                ? <div className='w-full h-full relative flex items-center justify-center group'>
                                    <div className='absolute opacity-0 group-hover:opacity-75 transition-opacity duration-500'>
                                        <div className='flex flex-col items-center justify-center rounded-full   w-[7rem] h-[7rem] bg-slate-200 cursor-pointer'>
                                            <label htmlFor="image-upload" className='cursor-pointer flex flex-col items-center gap-2'>
                                                <ImagePlus className="text-gray-600" />
                                                <span className="text-sm text-gray-600">Change Image</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="image-upload"
                                                className='hidden'
                                                accept="image/*"
                                                aria-label="Upload image"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                    {/* <img src={previewImage} alt="item" className='w-full h-full object-cover' /> */}
                                </div>
                                : <div className='flex flex-col items-center justify-center rounded-full bg-slate-300 w-[7rem] h-[7rem] hover:bg-slate-400 transition-colors cursor-pointer duration-500'>
                                    <label htmlFor="image-upload" className='cursor-pointer flex flex-col items-center gap-2'>
                                        <ImagePlus className="text-gray-600" />
                                        <span className="text-sm text-gray-600">Upload Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className='hidden'
                                        accept="image/*"
                                        aria-label="Upload image"
                                        onChange={handleImageUpload}
                                    />
                                </div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            name='name'
                            // value={itemFrom.name}
                            // onChange={(e) => handleInputChange(e)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            name='description'
                            // value={itemFrom.description}
                            // onChange={(e) => handleInputChange(e)}
                            type="text"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button className="btn btn-success">Save</button>
                    <button className="btn btn-error" type='button' onClick={() => handleRemoveImg()}>Remove</button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center text-sm">

                </div>
            </div>
        </Modal>        
  )
}
