import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import LandingPage from '../pages/guest/LandingPage'
import { User } from 'lucide-react'
import UserLayout from '../layouts/UserLayout'
import UserPage from '../pages/user/UserPage'
import useUserStore from '../stores/userStore'

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
          { index: true, element: <LandingPage />}
        ]
    },
    {
      path: '/MyAccount',
      element: <UserLayout />,
      children: [
        { index: true, element: <UserPage />}
      ]
    }
])

export default function AppRoute() {
  const user = useUserStore(pull => pull.user)
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}
