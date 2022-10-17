import React, { useEffect, useState } from 'react'
import AdminBaseLayout from "../../Components/AdminBaseLayout"
import { getAllBlogs } from "../../lib/blogs"


export default function EditBlog() {

    const [blogs, setBlogs] = useState([])
    
    useEffect(()=>{
        async function fetchData() {
            const allBlogs = await getAllBlogs(50);
            setBlogs(allBlogs)
        }
        fetchData();
    },[])

    useEffect(()=>{
        console.log(blogs)
    },[blogs])

  return (
    <>
     <AdminBaseLayout>
        <h1>Edit blog</h1>
     </AdminBaseLayout>
    </>
  )
}
