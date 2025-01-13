import React, { useEffect, useState } from 'react'
import AuthModal from '../kit/AuthModal'
import useUserStore from '../../stores/userStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import toprosLogo from '../../assets/ToprosLogo.png'

export default function Header() {
  const navigate = useNavigate()
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

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

  useEffect(() => {
    if (user && token) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [user])

  return (
    <div className='w-screen h-[5rem] bg-[#F7BB00] flex justify-around items-center fixed top-0 z-50'>
      <div>
        <img src={toprosLogo} alt="Topros Logo" className="h-[16rem]" />
      </div>
      <div className='flex gap-4'>

        {user
          ? <button className='btn btn-error'
            onClick={() => (logout(), toast.warning('logged out'))}>
            logout
          </button>
          : <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        }

        <button className={isUserLoggedIn ? 'btn btn-success' : 'btn btn-outline' } onClick={() => handleEnterAccount()}>Your Account</button>

        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </div>
  )
}
