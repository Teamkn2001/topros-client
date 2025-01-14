import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import LandingPage from '../pages/guest/LandingPage'
import UserLayout from '../layouts/UserLayout'
import UserPage from '../pages/user/UserPage'

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
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}
