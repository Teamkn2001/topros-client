import { Forward, Send } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { resetPassword, verifyPassword } from '../../api/user'
import Lottie from "lottie-react";
import loadingAnimation from '../../assets/Animation - loading1.json'

export default function ResetPassword({ onClose }) {
    const [password, setPassword] = useState('')

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isVerifySuccess, setIsVerifySuccess] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleVerityPassword = async () => {
        try {
            const rs = await verifyPassword(password)
 
            if (rs.data.canReset) {
                setIsVerifySuccess(true)
            } else {
                toast.error('password not match')
            }

        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error('password not match')
            return
        }

        try {
            setLoading(true)
            const formData = {
                oldPassword: password,
                newPassword: newPassword,
            }

            const rs = await resetPassword(formData)

            setPassword('')
            setNewPassword('')
            setConfirmPassword('')
           

            setTimeout(() => {
                setLoading(false)
                onClose()
                toast.success('password changed successfully')
            }, 2000)

        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {loading
                ? (
                    <Lottie
                        animationData={loadingAnimation}
                        loop
                        autoPlay
                    />
                )
                :
                (
                    <div className=' flex flex-col justify-center gap-4 mx-auto'>
                        <h2 className="text-xl font-semibold text-center">Reset Password</h2>
                        {!isVerifySuccess
                            ? (
                                <div className='flex gap-4 '>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd" />
                                        </svg>
                                        <input
                                            placeholder='current password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            className="grow"
                                            value={password} />
                                    </label>
                                    <button
                                        onClick={handleVerityPassword}
                                        className=" w-[3rem] h-[3rem] bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center  "
                                        disabled={password.length < 6}
                                    >
                                        <Forward />
                                    </button>
                                </div>
                            )
                            : (
                                <form
                                    className='flex flex-col gap-4'
                                    onSubmit={(e) => handleSubmitNewPassword(e)}>
                                    <input
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type="password"
                                        placeholder="new password"
                                        className="input input-bordered input-info w-full max-w-xs" />
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        placeholder="confirm new password"
                                        className="input input-bordered input-info w-full max-w-xs" />

                                    <button
                                        type="submit"
                                        className="btn btn-success">change password</button>
                                </form>
                            )}

                    </div>)}
        </div>
    )
}
