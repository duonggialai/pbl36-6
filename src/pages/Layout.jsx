import React from 'react'
import Header from '../components/Header'
import ListProduct from '../components/ListProduct'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
const Layout = () => {
  return (
    <div>
       <Header></Header>
       <main><Outlet/></main>
      <Footer/>
    </div>
  )
}

export default Layout
