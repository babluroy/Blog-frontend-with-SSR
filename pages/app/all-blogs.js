import React,{useEffect, useState} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import BlogCard from '../../Components/BlogCard';
import { getAllBlogs } from '../../lib/blogs';
import Router, { useRouter } from 'next/router';
import { url_constants } from '../../utils/routerLink_constants';
import EmptyBlogs from '../../Components/EmptyBlogs';

export default function AllBlogs({allBlogs}) {

 const params = useRouter();

 const [pageNum, setPageNum] = useState(1)
 const [isEmpty, setIsEmpty] = useState(false);

 const changePage = (isNext) => {
  if(!isNext == 1 && params.query.pageNumber == 1) return
    if(isNext){
        var pageNumber = parseInt(params.query.pageNumber) + 1
    } else {
        var pageNumber = parseInt(params.query.pageNumber) - 1
    }
   Router.push(url_constants.allBlogs_without_params + `?limit=${params.query.limit}` + `&pageNumber=${pageNumber}`)
}

useEffect(() => {
  setPageNum(params.query.pageNumber)
},[params])


useEffect(() => {
  if(allBlogs.length == 0){
    setIsEmpty(true)
  } else {
    setIsEmpty(false)
  }
},[allBlogs])


  return (
    <>
  {!isEmpty ? (
   <MDBContainer className='mb-5' style={{marginTop:"100px"}}>
     <MDBRow className="mt-5">
        {allBlogs.map((data, index) => (
        <MDBCol md='4' lg='4' sm='12' key={index}>
          <BlogCard title={data.title} shortDesc={data.shortDesc} image={data.image} id={data._id}/>
        </MDBCol>
        ))}
    </MDBRow>
    <div className="text-center mt-4">
      {pageNum != 1 ? (
        <MDBBtn color='secondary' size='lg' className='m-2' onClick={()=>{
          changePage(0)
        }}>
            Previous Page
        </MDBBtn>
       ) : ""}
        <MDBBtn color='secondary' size='lg' className='m-2' onClick={()=>{
        changePage(1)
       }}>
          Next Page
       </MDBBtn>
    </div>
    </MDBContainer>
   ) : 
     <EmptyBlogs/>
   }
    </>
  )
}


export const getServerSideProps = async ({query}) => {
    const limit = query.limit;
    const pageNumber = query.pageNumber;
    const allBlogs = await getAllBlogs(limit,pageNumber);
    return {
      props: {
        allBlogs: allBlogs || null,
      }
    }
  }