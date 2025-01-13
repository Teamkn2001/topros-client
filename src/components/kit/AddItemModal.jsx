import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { ImagePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import logFormData from '../../utils/logFormData';
import { addItem } from '../../api/user';
import UploadLoading from '../user/UploadLoading';


export default function AddItemModal({ isOpen, onClose, onSuccess }) {

    const [itemFrom, setItemForm] = useState({
        artName: '',
        artDescription: '',
        artImg: null,
        category: ''
    })

    const categories = [
        { value: 'Oil_Painting', label: 'Oil Painting' },
        { value: 'Watercolor_Painting', label: 'Watercolor Painting' },
        { value: 'Acrylic_Painting', label: 'Acrylic Painting' },
        { value: 'Encaustic_Painting', label: 'Encaustic Painting' },
        { value: 'Spray_Painting', label: 'Spray Painting' },
        { value: 'Indie_Art', label: 'Indie Art' },
    ];

    const [previewImage, setPreviewImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const clearForm = () => {
        if (previewImage) {
            URL.revokeObjectURL(previewImage)
            setPreviewImage(null)
        }

        setItemForm({
            artName: '',
            artDescription: '',
            artImg: null,
            category: ''
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setItemForm(prev => ({ ...prev, artImg: file }))
            // create a preview
            const previewUrl = URL.createObjectURL(file)
            setPreviewImage(previewUrl)
        }
    }

    const handleInputChange = (e) => {
        setItemForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!itemFrom.artImg) {
            return toast.error('Please upload an image')
        } else if(!itemFrom.artName) {
            return toast.error('Please enter a name')
        } else if (!itemFrom.category) {
            return toast.error('Please select a category')
        } 

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('artName', itemFrom.artName)
            formData.append('artDescription', itemFrom.artDescription)
            formData.append('artImg', itemFrom.artImg)
            formData.append('category', itemFrom.category)

            logFormData(formData)

            const rs = await addItem(formData)

            await onSuccess()

            setLoading(false)
            clearForm()
            onClose()
            toast.success('Item added successfully')

        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage)
                setPreviewImage(null)
            }
        }
    }, [previewImage])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {loading
                ? <UploadLoading />
                : <div className="min-w-[26rem] max-w-md p-6 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">

                        </h2>
                        <button
                            onClick={() => (onClose(), clearForm())}
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
                                        <img src={previewImage} alt="item" className='w-full h-full object-cover' />
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
                                name='artName'
                                value={itemFrom.artName}
                                onChange={(e) => handleInputChange(e)}
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                name='artDescription'
                                value={itemFrom.artDescription}
                                onChange={(e) => handleInputChange(e)}
                                type="text"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={itemFrom.category}
                                onChange={(e) => handleInputChange(e)}
                                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white'
                            >
                                <option value='' disabled>Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.value}>{category.label}</option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-success">Add Art</button>
                    </form>

                    {/* Footer */}
                    <div className="mt-4 text-center text-sm">

                    </div>
                </div>
            }
        </Modal>
    )
}
