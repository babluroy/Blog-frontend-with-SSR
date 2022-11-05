import React from 'react'
import Navbar from '../Navbar'
import Footer from "../Footer"

export default function Layout({children}) {
  return (
    <>
        <Navbar/>
        <div style={{marginBottom: "70px"}}>
          {children}
        </div>
    </>
  )
}
