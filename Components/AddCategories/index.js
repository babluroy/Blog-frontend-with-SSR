import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import ApiService from '../../api';
import { toast } from 'react-toastify';
import Loader from "../Loader"

const initialState = {
    name: "",
}

export default function AddCategoryForm() {

  const params = useRouter();
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(initialState)
  const [userId, SetUserId] = useState(null)
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({...category, [e.target.name]: value})
  }

  const resetForm = () => {
    setCategory({...category, name: ""})
  }


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    e.target.reset();
    const api = new ApiService();
    await api.CREATE_CATGORY(userId, category).then((res) => {
      setLoading(false);
      toast.success("Successfully added the category");
      resetForm();
    }).catch((err) => {
      setLoading(false);
      toast.error(err.response?.data?.error);
    })
  }

 // TODO: EDIT CATEGORY

  useEffect(() => {
    // getAllCategories();
    const id = JSON.parse(localStorage.getItem("jwt"))?._id;
    // const blogId = params.query.blogId;
    SetUserId(id);
  },[])


//   const getAllCategories = async(e) => {
//     setLoading(true);
//     const api = new ApiService();
//     await api.GET_ALL_CATEGORIES().then((res) => {
//       setCategories(res.data);
//       setLoading(false);
//     }).catch((err) => {
//       toast.error(err.response.data.error);
//       setLoading(false);
//     })
//   }

//   const handleChangeCheckbox = (name, check) => {
//     setBlog({...blog, [name]: check})
//   }

//   const updateBlog = async(e) => {
//     e.preventDefault();
//     setLoading(true);
//     e.target.reset();
//     const api = new ApiService();
//     let payload = {
//       title: blog.title,
//       category: blog.category._id,
//       image: blog.image,
//       shortDesc: blog.shortDesc,
//       desc: blog.desc,
//       featured: blog.featured,
//       highlighted: blog.highlighted,
//     }
//     await api.UPDATE_BLOG(blog?._id, userId, payload).then((res) => {
//       setLoading(false);
//       toast.success("Blog has been successfully updated");
//       resetForm();
//     }).catch((err) => {
//       setLoading(false);
//       toast.error(err.response?.data?.error);
//     })
//   }


//   const readBlogById = async() => {
//     const queryString = window.location.search;
//     const parameters = new URLSearchParams(queryString);
//     const blogId = parameters.get('blogId');
//     if(blogId) {
//       const blog = await getBlogById(blogId);
//       setBlog(blog)
//       setIsEdit(true);
//     } else {
//       setIsEdit(false);
//     }
//   }

//   useEffect(()=> {
//     readBlogById()
//   }, [])


  return (
    <>
    <Loader loader={loading}/>
     <h3 className="mb-4">
      {isEdit ? "Edit Category" : "Create Category" }
     </h3>
    <form onSubmit={isEdit ? updateBlog : handleSubmit}>
      <MDBRow className='mb-4'>
        <MDBCol md={4}>
          <MDBInput label='Name' name="name" value={category.name} onChange={handleChange} />
        </MDBCol>
      </MDBRow>
      {isEdit ? (
      <MDBBtn className='mb-5' color="secondary" type='submit'>
        Edit Category
      </MDBBtn>
      ) : (
      <MDBBtn className='mb-5' type='submit'>
        Add Category
      </MDBBtn>
      )}
    </form>
    </>
  );
}