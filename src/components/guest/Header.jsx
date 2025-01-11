import React, { useState } from 'react'
import AuthModal from '../kit/AuthModal'
import useUserStore from '../../stores/userStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Header() {
  const navigate = useNavigate()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const user = useUserStore(pull => pull.user)
  const token = useUserStore(pull => pull.token)
  const logout = useUserStore(pull => pull.logout)

  const handleEnterAccount = () => {
    if (user && token) {
      navigate('/MyAccount')
    } else {
      setIsAuthOpen(true)
    }
  }
  return (
    <div className='w-screen h-[5rem] bg-yellow-300 flex justify-around items-center fixed top-0 z-50'>
      <div>
        <h1>Topros Gallery</h1>
      </div>
      <div className='flex gap-4'>

        {user
          ? <button className='btn btn-outline btn-error'
            onClick={() => (logout(), toast.warning('logged out'))}>
            logout
          </button>
          : <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        }

        <button className="btn btn-outline" onClick={() => handleEnterAccount()}>Your Account</button>
        
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </div>
  )
}
