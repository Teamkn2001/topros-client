import React from 'react'
import LandingPage from '../pages/guest/LandingPage'
import { Outlet } from 'react-router-dom'
import Footer from '../components/guest/Footer'
import Header from '../components/guest/Header'

export default function GuestLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
