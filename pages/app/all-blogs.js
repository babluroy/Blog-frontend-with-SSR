import React, {useEffect} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import BlogCard from '../../Components/BlogCard';
import { getAllBlogs } from '../../lib/blogs';
import Router, { useRouter } from 'next/router';
import { url_constants } from '../../utils/routerLink_constants';

export default function AllBlogs({allBlogs}) {

 const params = useRouter();

 const changePage = (isNext) => {

    if(!isNext == 1 && params.query.pageNumber == 1) return

    if(isNext){
        var pageNumber = parseInt(params.query.pageNumber) + 1
    } else {
        var pageNumber = parseInt(params.query.pageNumber) - 1
    }

   Router.push(url_constants.allBlogs_without_params + `?limit=${params.query.limit}` + `&pageNumber=${pageNumber}`)

}

  return (
    <>
   <MDBContainer className='pt-4 mb-5'>
     <MDBRow className="mt-5">
        {allBlogs.map((data, index) => (
        <MDBCol md='4' lg='4' sm='12' key={index}>
          <BlogCard title={data.title} shortDesc={data.shortDesc} image={data.image} id={data._id}/>
        </MDBCol>
        ))}
    </MDBRow>
    <div className="text-center mt-4">
       <MDBBtn outline color='secondary' size='lg' className='m-2' onClick={()=>{
        changePage(0)
       }}>
          Previous Page
       </MDBBtn>
        <MDBBtn outline color='secondary' size='lg' className='m-2' onClick={()=>{
        changePage(1)
       }}>
          Next Page
       </MDBBtn>
    </div>
    </MDBContainer>
    </>
  )
}


export const getServerSideProps = async ({query}) => {
    const limit = query.limit;
    const pageNumber = query.pageNumber;
    const allBlogs = await getAllBlogs(limit,pageNumber);
    return {
      props: {
        allBlogs
      }
    }
  }