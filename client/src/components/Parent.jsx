import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Login from './login'

const Parent = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-2">
    <Navbar />
    <main className="mt-8 min-h-screen">
      <Outlet />
    </main>
    <Footer />
    
  </div>
  )
}

export default Parent