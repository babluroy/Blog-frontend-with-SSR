import React,{useEffect, useState} from 'react'
import BlogCard from '../../../Components/BlogCard';
import { getBlogsByCategories } from '../../../lib/blogs';
import Router, { useRouter } from 'next/router';
import { url_constants } from '../../../utils/routerLink_constants';
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import EmptyBlogs from '../../../Components/EmptyBlogs';


export default function BlogsByCategory({blogs}) {

  const params = useRouter();

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
    if(blogs.length == 0){
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  },[blogs])
  

  return (
    <>
    {!isEmpty ? (
    <MDBContainer className='pt-2 pb-5'>
      <MDBRow className="mt-5">
         {blogs.map((data, index) => (
         <MDBCol md='4' lg='4' sm='12' key={index}>
           <BlogCard title={data.title} shortDesc={data.shortDesc} image={data.image} id={data._id}/>
         </MDBCol>
         ))}
     </MDBRow>
     <div className="text-center mt-4">
        <MDBBtn color='secondary' size='lg' className='m-2' onClick={()=>{
         changePage(0)
        }}>
           Previous Page
        </MDBBtn>
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


export const getServerSideProps = async (context) => {
    const { params } = context;
    const id = params.id;
    const limit = params.limit;
    const pageNumber = params.pageNumber;
    const blogs = await getBlogsByCategories(id,limit,pageNumber);
    return {
        props: {
            blogs: blogs || null,
        },
    }
  }
