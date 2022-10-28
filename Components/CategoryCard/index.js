import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardBody,
    MDBBtn
  } from 'mdb-react-ui-kit';
  

export default function CategoryCard({category,isAdmin = false, edit, trash}) {
  return (
     <MDBCard background='success' className='text-white mb-3'>
        <MDBCardBody>
          <MDBCardTitle>{category}</MDBCardTitle>
        </MDBCardBody>
        {isAdmin ? (
        <MDBContainer className='mb-4'>
          <MDBBtn onClick={edit}>Edit</MDBBtn>
          <MDBBtn className='mx-2' color="danger" onClick={trash}>Delete</MDBBtn>
        </MDBContainer>
        ) : "" }
      </MDBCard>
  )
}
