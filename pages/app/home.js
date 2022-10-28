import React from 'react'
import BlogCard from '../../Components/BlogCard'
import CarouselComp from "../../Components/Carousel"
import {getHighlightedBlogs, getFeaturedBlogs, getAllBlogs} from "../../lib/blogs"
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import Link from 'next/link';
import {url_constants} from "../../utils/routerLink_constants"

export default function Home({caraouselBlogs,featuredBlogs,allBlogs}) {

  return (
    <>
     <CarouselComp caraouselBlogs={caraouselBlogs}/>

     <MDBContainer className="mt-5">

      <h3 className="text-center">Featured Blogs</h3>
      <MDBRow className="mt-5">
        {featuredBlogs.map((data, index) => (
        <MDBCol md='4' lg='4' sm='12' key={index}>
          <BlogCard title={data.title} shortDesc={data.shortDesc} image={data.image} id={data._id}/>
        </MDBCol>
        ))}
      </MDBRow>
    
    <div className="mt-5">
      <h3>All Blogs</h3>
    </div>
    <MDBRow className="mt-5">
        {allBlogs.map((data, index) => (
        <MDBCol md='4' lg='4' sm='12' key={index}>
          <BlogCard title={data.title} shortDesc={data.shortDesc} image={data.image} id={data._id}/>
        </MDBCol>
        ))}
    </MDBRow>
    <div className="d-grid gap-2 col-6 mx-auto mb-10 mt-4">
      <Link href={url_constants.allBlogs}>
        <MDBBtn color='secondary' rounded>View All</MDBBtn>
      </Link>
    </div>
    </MDBContainer>
    </>
  )
}

export const getStaticProps = async () => {
  const caraouselBlogs = await getHighlightedBlogs();
  const featuredBlogs = await getFeaturedBlogs();
  const allBlogs = await getAllBlogs(50);
  return {
    props: {
      caraouselBlogs,
      featuredBlogs,
      allBlogs
    }
  }
}

