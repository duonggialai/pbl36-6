import React from 'react'
import Header from '../components/Header'
import ListProduct from '../components/ListProduct'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div>
       <Header></Header>
       <main><Outlet/></main>
      
    </div>
  )
}

export default Layout
