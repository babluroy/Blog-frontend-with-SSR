import React, { useContext, useState } from 'react'
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
import { authenticate } from '../../helpers/auth';
import Router from 'next/router';
import { toast } from 'react-toastify';
import {UserContext} from "../../Context/UserContext"

export default function Login() {

  const initialState = {
    email: "admin@admin.com",
    password: "59192580"
  };

  const context = useContext(UserContext);

  const [credentials, setCredentials] = useState(initialState)
  const [loader, setLoader] = useState(false)

  const handleChangeInput = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const redirect = () => {
    Router.push("/")
  }

  const handleLogin = async(e) => {
    setLoader(true);
    e.preventDefault();
    const api = new ApiService();
    await api.Login(credentials).then((res) => {
      setLoader(false);
      toast.success(`Welcome ${res.data.name}`)
      authenticate(res.data);
      context.setUser(res.data)
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
       <h2>Login</h2>
      </div>
        <MDBCardTitle>E-mail</MDBCardTitle>
        <MDBInput name="email" type='email' autoComplete="off" value={credentials.email} onChange={handleChangeInput}/>
        <div className='mt-4'>
          <MDBCardTitle>Password</MDBCardTitle>
          <MDBInput name="password" type='password' value={credentials.password} autoComplete="off" onChange={handleChangeInput}/>
        </div>
        <div className="mt-4">
          <MDBBtn onClick={handleLogin}>Login</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
    </>
  )
}
