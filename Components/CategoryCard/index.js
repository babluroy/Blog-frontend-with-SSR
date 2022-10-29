import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardTitle,
    MDBCardBody,
    MDBBtn
  } from 'mdb-react-ui-kit';
import Link from 'next/link';
import {url_constants} from "../../utils/routerLink_constants"


export default function CategoryCard({category,isAdmin = false, edit, trash, id}) {
  return (
     <MDBCard background='success' className='text-white mb-3 cursor-pointer'>
       <Link href={url_constants.get_blogs_by_categories + id + "?pageNumber=1&limit=50"}>
        <MDBCardBody>
          <MDBCardTitle>{category}</MDBCardTitle>
        </MDBCardBody>
        </Link>
        {isAdmin ? (
        <MDBContainer className='mb-4'>
          <MDBBtn onClick={edit}>Edit</MDBBtn>
          <MDBBtn className='mx-2' color="danger" onClick={trash}>Delete</MDBBtn>
        </MDBContainer>
        ) : "" }
      </MDBCard>
  )
}
