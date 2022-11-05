import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import AdminBaseLayout from "../../Components/AdminBaseLayout"
import { getAllBlogs } from "../../lib/blogs"
import { MDBRow, MDBCol, MDBBtn, MDBContainer} from 'mdb-react-ui-kit';
import { url_constants } from '../../utils/routerLink_constants';
import BlogCard from '../../Components/BlogCard';
import ApiService from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import Layout from '../../Components/Layout';

export default function EditBlog() {

    const params = useRouter();
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [userId, SetUserId] = useState(null)

    
    useEffect(()=>{
      getBlogs()
    },[])

    const getBlogs = async() => {
      const limit = params.query.limit;
      const pageNumber = params.query.pageNumber;
      const allBlogs = await getAllBlogs(limit, pageNumber);
      setBlogs(allBlogs)
    }

    const changePage = (isNext) => {
      if(!isNext == 1 && params.query.pageNumber == 1) return;
      if(isNext){
        var pageNumber = parseInt(params.query.pageNumber) + 1
      } else {
        var pageNumber = parseInt(params.query.pageNumber) - 1
      }
      Router.push(url_constants.edit_blog + `?limit=${params.query.limit}` + `&pageNumber=${pageNumber}`)
    }

    useEffect(()=>{
      getBlogs();
    },[params])

    useEffect(() => {
      const id = JSON.parse(localStorage.getItem("jwt"))?._id;
      SetUserId(id);
    },[])  

    const deleteBlog = async(title, id, userId) => {
      const result = window.confirm(`Are you sure you want to delete ${title}?`);
      if(!result) return;
      setLoading(true);
      const api = new ApiService();
      await api.DELETE_BLOG(id, userId).then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        params.reload(window.location.pathname)
      }).catch((err) => {
        toast.error(err.response.data.error);
        setLoading(false);
      })
    }

    const editBlog = (blogId) => {
      Router.push(url_constants.admin + `?blogId=${blogId}`)
    }

  return (
    <Layout>
    <Loader loader={loading}/>
     <AdminBaseLayout>
      <MDBContainer>
        <h3>Edit / Delete blog</h3>
        
      <MDBRow className="mt-3">
        {blogs.map((data, index) => (
        <MDBCol md='4' lg='4' sm='12' key={index}>
          <BlogCard 
          title={data.title} 
          shortDesc={data.shortDesc} 
          image={data.image} 
          id={data._id} 
          isAdmin={true} 
          trash={()=>{
            deleteBlog(data.title, data._id, userId)
          }} 
          edit={()=>{
            editBlog(data._id)
          }}/>
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
     </AdminBaseLayout>
    </Layout>
  )
}
