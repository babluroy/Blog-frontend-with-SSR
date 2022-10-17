import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn
} from 'mdb-react-ui-kit';
import styles from "./index.module.css"
import Link from 'next/link';
import {url_constants} from "../../utils/routerLink_constants"

export default function BlogCard({image, title, shortDesc, id, isAdmin = false, edit, trash}) {

  return (
    <>
    <Link href={url_constants.blog + id}>
    <MDBCard className={styles.cardBlog}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={image} fluid alt={title} />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>
          {shortDesc}
        </MDBCardText>
        {isAdmin ? (
          <>
        <MDBBtn
         onClick={edit}
        >Edit</MDBBtn>
        <MDBBtn className='mx-2' color="danger" onClick={trash}>Delete</MDBBtn>
           </>
        ) :""}
      </MDBCardBody>
    </MDBCard>
    </Link>
    </>
  );
}