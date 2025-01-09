import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../kit/Modal'
import { ImagePlus } from 'lucide-react'
import useUserStore from '../../stores/userStore'
import UserCard from '../kit/UserCard'
import logFormData from '../../utils/logFormData'
import { editProfile } from '../../api/user'

export default function EditProfileModal({ isOpen, onClose }) {
    const user = useUserStore(pull => pull.user)
    const fetchEditedUser = useUserStore(pull => pull.fetchEditedUser)

    const [profileForm, setProfileForm] = useState({
        username: "",
        bio: "",
        profileImage: null
    })

    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function clearForm() {
        setProfileForm({
            username: "",
            bio: "",
            profileImage: null
        })

        if (previewImage) {
            URL.revokeObjectURL(previewImage)
        }
        setPreviewImage(null)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileForm(prev => ({ ...prev, profileImage: file }))
            // create a preview
            const previewUrl = URL.createObjectURL(file)
            console.log("previewUrl image ===", previewUrl)
            setPreviewImage(previewUrl)
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.append('username', profileForm.username)
            formData.append('bio', profileForm.bio)
            if (previewImage) {
                formData.append('profileImage', profileForm.profileImage)
            }

            logFormData(formData)

            const useEditProfile = await editProfile(formData)
            console.log("pass edit")
            const rs = await fetchEditedUser(user.id)
            console.log('pass fetchNew')
            clearForm()
            onClose()

        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    const handleInputChange = (e) => {
        setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (user) {
            setProfileForm(prev => ({
                ...prev,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage
            }))
        } else {
            clearForm()
        }
    }, [user, isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading
                ? <div className='min-w-[26rem] flex justify-center items-center h-[30rem]'><p>Loading...</p></div>
                :
                <div className="min-w-[40rem] max-w-md p-6 ">
                    {/* Header */}
                    <div className="flex justify-between items-center ">
                        <div></div>
                        <button
                            onClick={() => { onClose(), clearForm() }}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            ✕
                        </button>
                    </div>
                    {/* Form */}
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 flex justify-center gap-6">
                        <div className='w-full flex justify-center items-center'>
                            <div className=' bg-slate-100 rounded-full border-2 border-black border-dashed flex justify-center items-center '>
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
                                        <UserCard imgUrl={previewImage} />
                                    </div>
                                    : <div className='w-full h-full relative flex items-center justify-center group overflow-hidden '>
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
                                        <UserCard imgUrl={profileForm.profileImage} />
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-6 py-4'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    name='username'
                                    value={profileForm.username}
                                    onChange={(e) => handleInputChange(e)}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    name='bio'
                                    value={profileForm.bio}
                                    onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                />
                            </div>

                            {/* <div>
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
                            </div> */}

                            <button className="btn btn-success">Save</button>
                        </div>

                        {/* <button className="btn btn-error" type='button' onClick={() => handleRemoveItem()}>Remove</button> */}
                    </form>

                    {/* Footer */}
                    <div className="mt-4 text-center text-sm">
                    </div>
                </div>}
        </Modal>
    )
}