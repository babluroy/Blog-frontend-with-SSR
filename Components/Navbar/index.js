import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Link from 'next/link';
import styles from "./index.module.css"
import { url_constants } from '../../utils/routerLink_constants';
import { isAuthenticated, signout } from '../../helpers/auth';

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("jwt");
    const role = JSON.parse(userInfo)
    setIsAdmin(role?.role)
  }, [])


  return (
    <MDBNavbar expand='lg' dark bgColor='dark' className={styles.navbarCustom}>
      <MDBContainer fluid>
        <Link href="/">
          <MDBNavbarBrand className={styles.brandText}>Intesol Blogs</MDBNavbarBrand>
        </Link>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <Link href="/">
              <MDBNavbarLink active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
             </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link href={url_constants.allBlogs}>
                <MDBNavbarLink>All Blogs</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            {isAuthenticated() && isAdmin ? (
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Admin Dashboard</MDBNavbarLink>
            </MDBNavbarItem>
            ) : ""}
          </MDBNavbarNav>

          {isAuthenticated() ? (
          <div className='d-flex input-group w-auto'>
            <MDBBtn color='danger' onClick={signout}>Logout</MDBBtn>
          </div>
          ) :""}

          {!isAuthenticated() ? (
          <div className='d-flex input-group w-auto'>
            <Link href={url_constants.signup}>
              <MDBBtn color='success'>Signup</MDBBtn>
            </Link>
          </div>
          ) :""}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}