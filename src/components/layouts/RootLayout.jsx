import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default RootLayout