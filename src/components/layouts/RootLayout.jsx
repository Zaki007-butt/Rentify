import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default RootLayout