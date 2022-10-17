import React from 'react'
import SideNav from "../Sidenav"

export default function index({children}) {
  return (
    <>
    <SideNav>
     {children}
    </SideNav> 
    </>
  )
}
