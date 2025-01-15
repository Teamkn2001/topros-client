// components/auth/AuthModal.jsx
import { useState } from 'react'
import Modal from './Modal'
import useUserStore from '../../stores/userStore'
import { toast } from 'react-toastify'


export default function AuthModal({ isOpen, onClose }) {

    const register = useUserStore(pull => pull.register)
    const login = useUserStore(pull => pull.login)
    const [isLogin, setIsLogin] = useState(true)
    const [authForm, setAuthFrom] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onInputChange = (e) => {
        setAuthFrom({ ...authForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            if (isLogin) {
                const loginForm = {
                    email: authForm.email,
                    password: authForm.password
                }
   
                await login(loginForm)
                setAuthFrom({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                onClose()
                toast.success('Login success')
            } else {
                await register(authForm)
                toast.success('Register success, please try to login')
                setAuthFrom({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                setIsLogin(true)
                onClose()
            }
        } catch (error) {
            const errMsg = error?.response?.data?.msg || error.message
            toast.error(errMsg)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-md p-6 bg-yellow-500 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {isLogin ? 'Login' : 'Register'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            name='email'
                            value={authForm.email}
                            onChange={(e) => onInputChange(e)}

                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password {isLogin ? '' : ' (min 6 characters)'}
                        </label>
                        <input
                            name='password'
                            value={authForm.password}
                            onChange={(e) => onInputChange(e)}
                            type="password"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {!isLogin
                        ? <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password 
                            </label>
                            <input
                                name='confirmPassword'
                                value={authForm.confirmPassword}
                                onChange={(e) => onInputChange(e)}
                                type="password"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>
                        : null
                    }

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center text-sm">
                    <span className="text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setAuthFrom({
                                email: '',
                                password: '',
                                confirmPassword: ''
                            })
                        }}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}