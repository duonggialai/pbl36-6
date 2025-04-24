import React from 'react'
import ListProduct from '../components/ListProduct'
import '../styles/Home.css'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <>
      
      <main className="product-page">
        <Navbar></Navbar>
        <Outlet/>
        
      </main>
    </>
  )
}

export default Home
