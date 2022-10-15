import React, { useState, useEffect } from 'react'
import { 
    MDBInput, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBBtn } 
from 'mdb-react-ui-kit';
import {card} from "./index.module.css"
import ApiService from '../../api';
import Loader from '../Loader';
import { authenticate, isAuthenticated } from '../../helpers/auth';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Signup() {

  const initialState = {
     name: "",
     lastname: "",
     email: "",
     password: "",
     role: 0,
  };

  const [credentials, setCredentials] = useState(initialState)
  const [loader, setLoader] = useState(false)

  const handleChangeInput = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const redirect = () => {
    Router.push("/")
  }

  useEffect(() => {
    if(isAuthenticated()){
      redirect();
    }
  }, [])

  const handleSignup = async(e) => {
    setLoader(true);
    e.preventDefault();
    const api = new ApiService();
    await api.Signup(credentials).then((res) => {
      setLoader(false);
      toast.success(`Welcome ${res.data.name}`)
      authenticate(res.data);
      redirect();
    }).catch((err) => {
      toast.error(err.response.data.error);
      setLoader(false);
    })
  }

  return (
    <>
    <Loader loader={loader}/>
    <MDBCard className={card}>
      <MDBCardBody>
      <div className="mb-4 text-center">
       <h2>Signup</h2>
     </div>
        <MDBCardTitle>First Name</MDBCardTitle>
        <MDBInput name="name" type='text' autoComplete="off" onChange={handleChangeInput}/>

        <div className='mt-4'>
          <MDBCardTitle>Last Name</MDBCardTitle>
          <MDBInput name="lastname" type='text' autoComplete="off" onChange={handleChangeInput}/>
        </div>

        <div className='mt-4'>
          <MDBCardTitle>E-mail</MDBCardTitle>
          <MDBInput name="email" type='email' autoComplete="off" onChange={handleChangeInput}/>
        </div>

        <div className='mt-4'>
          <MDBCardTitle>Password</MDBCardTitle>
          <MDBInput name="password" type='password' autoComplete="off" onChange={handleChangeInput}/>
        </div>
        <div className="mt-4">
          <MDBBtn onClick={handleSignup}>Signup</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
    </>
  )
}
