import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { ImagePlus } from 'lucide-react'
import ItemCard from './ItemCard'
import { deleteItem, editItem } from '../../api/user'
import { toast } from 'react-toastify'
import logFormData from '../../utils/logFormData'
import UploadLoading from '../user/UploadLoading'

export default function EditItemModal({ isOpen, onClose, item, onSuccess }) {

    const [itemFrom, setItemForm] = useState({
        id: null,
        artName: "",
        artDescription: "",
        category: "indie_art",
        artImg: "",
        newArtIme: null
    })

    const clearForm = () => {
        setItemForm({
            id: null,
            artName: "",
            artDescription: "",
            category: "",
            artImg: "",
            newArtIme: null
        })
        setPreviewImage(null)
    }

    const categories = [
        { value: 'Oil_Painting', label: 'Oil Painting' },
        { value: 'Watercolor_Painting', label: 'Watercolor Painting' },
        { value: 'Acrylic_Painting', label: 'Acrylic Painting' },
        { value: 'Encaustic_Painting', label: 'Encaustic Painting' },
        { value: 'Spray_Painting', label: 'Spray Painting' },
        { value: 'Indie_Art', label: 'Indie Art' },
    ];

    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        console.log("file image ===", file)

        if (file) {
            setItemForm(prev => ({ ...prev, newArtIme: file }))
            // create a preview
            const previewUrl = URL.createObjectURL(file)

            setPreviewImage(previewUrl)
        }
    }

    const handleInputChange = (e) => {
        setItemForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleRemoveItem = () => {
        const id = itemFrom.id

        try {
            const rs = deleteItem(id)
            toast.success('Item removed successfully')
            onSuccess()
            onClose()
        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const formData = new FormData()
            formData.append('artName', itemFrom.artName)
            formData.append('artDescription', itemFrom.artDescription)
            formData.append('category', itemFrom.category)
            if (itemFrom.newArtIme) {
                formData.append('newImage', itemFrom.newArtIme)
            }

            const editArt = await editItem(itemFrom.id, formData)

            if (editArt.data.imageUpdated) {
                await new Promise(resolve => setTimeout(resolve, 2000))
            }
            // Fetch new data
            await onSuccess()

            setIsLoading(false)
            clearForm()
            onClose()
            toast.success('Item updated successfully')

        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    useEffect(() => {
        // if item is not null, set the form with the item data (first render null?!)
        if (item) {
            setItemForm(prev => ({
                ...prev,
                id: item.id || "",
                artName: item.artName || "",
                artDescription: item.artDescription || "",
                category: item.category || "indie_art",
                artImg: item.artImg || ""
            }))
        } else {
            clearForm() // Reset to initial state when item is null
        }
    }, [item, isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading
                ? <UploadLoading />
                : <div className="min-w-[26rem] max-w-md p-6 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div></div>
                        <button
                            onClick={() => { onClose(), clearForm() }}
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
                                    : <div className='w-full h-full relative flex items-center justify-center group overflow-hidden'>
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
                                        <ItemCard imgUrl={itemFrom.artImg} />
                                    </div>
                                }
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
                                value={itemFrom.category || 'indie_art'}
                                onChange={(e) => handleInputChange(e)}
                                className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-white'
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.value}>{category.label}</option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-success">Save</button>
                        <button className="btn btn-error" type='button' onClick={() => handleRemoveItem()}>Remove</button>
                    </form>

                    {/* Footer */}
                    <div className="mt-4 text-center text-sm">
                    </div>
                </div>}
        </Modal>
    )
}
