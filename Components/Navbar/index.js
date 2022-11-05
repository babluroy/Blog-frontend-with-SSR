import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {

  const params = useRouter();
  const context = useContext(UserContext)

  const [url, setUrl] = useState("")
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  

  useEffect(() => {
    const userInfo = localStorage.getItem("jwt");
    const role = JSON.parse(userInfo)
    setIsAdmin(role?.role)
  }, [])

  useEffect(() => {
    const auth = isAuthenticated();
    setIsAuth(auth)
    if(context.user) {
      setIsAuth(context.user)
      setIsAdmin(context.user?.role)
    }
  },[context])

  const logoutHandler = () => {
    context.setUser(null);
    signout();
  }

  useEffect(() => {
    const auth = isAuthenticated();
    if(auth){
      setIsAuth(auth)
    }
  },[])

  useEffect(() => {
    setUrl(params.pathname)
  },[params])

  const collapseNavbar = () => {
    setShowNavNoTogglerSecond(false)
  }

  return (
    <>
      <MDBNavbar  fixed='top' expand='lg' dark className={styles.navbarCustom}>
        <MDBContainer fluid>
          <Link href="/">
            <MDBNavbarBrand className={styles.brandText}>Intesol</MDBNavbarBrand>
          </Link>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavNoTogglerSecond} navbar>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem onClick={collapseNavbar}>
              <Link href="/">
                <MDBNavbarLink aria-current='page'className={url == url_constants.home ? "active" : ""}>
                  Home
                </MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
              <MDBNavbarItem onClick={collapseNavbar}>
              <Link href={url_constants.allBlogs}>
                <MDBNavbarLink className={url == url_constants.allBlogs_without_params ? "active" : ""}>All Blogs</MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
              {isAdmin ? (
              <MDBNavbarItem onClick={collapseNavbar}>
              <Link href={url_constants.admin}>
                <MDBNavbarLink className={url == url_constants.allBlogs_without_params ? "active" : ""}>Admin Panel</MDBNavbarLink>
              </Link>
              </MDBNavbarItem>
              ) : ""}
            </MDBNavbarNav>
            
          {isAuth ? (
          <div className='d-flex input-group w-auto'>
            <MDBBtn color='danger' onClick={logoutHandler}>Logout</MDBBtn>
          </div>
          ) :
          <>
            <div className='d-flex input-group w-auto' onClick={collapseNavbar}>
              <Link href={url_constants.signup}>
                <MDBBtn color='success' className={styles.authButton}>Signup</MDBBtn>
              </Link>
            </div>
            <div className='d-flex input-group w-auto' onClick={collapseNavbar}>
              <Link href={url_constants.signin}>
                <MDBBtn color='secondary' className={styles.authButton}>Login</MDBBtn>
              </Link>
            </div>
            </>
          }
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}