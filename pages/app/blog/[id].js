import React, { useEffect } from 'react'
import { MDBContainer} from 'mdb-react-ui-kit';
import styles from "./index.module.css"
import {getBlogById} from "../../../lib/blogs"
import Image from 'next/image';
import moment from 'moment/moment';

export default function Blog({blog}) {

   const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
   }
    
  return (
    <div className={styles.blogContainer}>
        <MDBContainer className='pt-3 mb-5'>
            <h1 className="text-center">{blog.title}</h1>
            <div className={styles.imageContainer}>
              <Image 
               src={blog.image}
               height={350}
               width={600}
               alt={blog.title}
              />
            </div>
            <div className="mt-5">
                <div className="mb-3">
                  <b>Date: {formatDate(blog.createdAt)}</b>
                   <span className="mx-4">|</span>
                  <b>Category: {blog.category.name}</b>
                </div>
              <div className={styles.desc} dangerouslySetInnerHTML={{__html: `${blog.desc}`}}></div>
            </div>
        </MDBContainer>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const { params } = context;
    const id = params.id;
    const blog = await getBlogById(id);
    return {
        props: {
            blog: blog || null,
        },
    }
  }