import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBFile
} from 'mdb-react-ui-kit';
import ApiService from '../../api';
import { toast } from 'react-toastify';
import Loader from "../Loader"
import { Editor } from '@tinymce/tinymce-react';
import { getBlogById } from '../../lib/blogs';

const initialState = {
  title: "",
  category: "",
  image: {},
  shortDesc: "",
  desc: "",
  featured: true,
  highlighted: false,
}

export default function CreateBlogForm() {

  const params = useRouter();
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [blog, setBlog] = useState(initialState)
  const [userId, SetUserId] = useState(null)
  const [isEdit, setIsEdit] = useState(false);

  const getAllCategories = async(e) => {
    setLoading(true);
    const api = new ApiService();
    await api.GET_ALL_CATEGORIES().then((res) => {
      setCategories(res.data);
      setLoading(false);
    }).catch((err) => {
      toast.error(err.response.data.error);
      setLoading(false);
    })
  }

  const handleChange = (e, isImage = 0) => {
    const value = isImage ? e.target.files[0] : e.target.value;
    setBlog({...blog, [e.target.name]: value})
  }

  const handleChangeCheckbox = (name, check) => {
    setBlog({...blog, [name]: check})
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    e.target.reset();
    const api = new ApiService();
    await api.CREATE_BLOG(userId, blog).then((res) => {
      setLoading(false);
      toast.success("Blog has been successfully uploaded");
      resetForm();
    }).catch((err) => {
      setLoading(false);
      toast.error(err.response?.data?.error);
    })
  }

  const updateBlog = async(e) => {
    e.preventDefault();
    setLoading(true);
    e.target.reset();
    const api = new ApiService();
    let payload = {
      title: blog.title,
      category: blog.category._id,
      image: blog.image,
      shortDesc: blog.shortDesc,
      desc: blog.desc,
      featured: blog.featured,
      highlighted: blog.highlighted,
    }
    await api.UPDATE_BLOG(blog?._id, userId, payload).then((res) => {
      setLoading(false);
      toast.success("Blog has been successfully updated");
      resetForm();
    }).catch((err) => {
      setLoading(false);
      toast.error(err.response?.data?.error);
    })
  }

  useEffect(() => {
    getAllCategories();
    const id = JSON.parse(localStorage.getItem("jwt"))?._id;
    const blogId = params.query.blogId;
    SetUserId(id);
  },[])


  const readBlogById = async() => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const blogId = parameters.get('blogId');
    if(blogId) {
      const blog = await getBlogById(blogId);
      setBlog(blog)
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }

  useEffect(()=> {
    readBlogById()
  }, [])


  return (
    <>
    <Loader loader={loading}/>
     <h3 className="mb-4">
      {isEdit ? "Edit Blog" : "Create Blog" }
     </h3>
    <form onSubmit={isEdit ? updateBlog : handleSubmit}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput label='Title' name="title" onChange={handleChange} value={blog.title} contrast/>
        </MDBCol>

        <MDBCol>
            <select className="browser-default custom-select dropdown" name="category" disabled={loading} onChange={handleChange}>
              <option className="option-placeholder" defaultValue>Select Category</option>
              {categories.map((value, i)=> (
              <Fragment key={i}>
                <option value={value._id} selected={blog.category.name == value.name}>{value.name}</option>
              </Fragment>
              ))}
            </select>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBFile 
            label={isEdit ? "Change Cover Image" : "Choose Cover Image"} 
            id='customFile'
            type="file"
            accept="image"
            name="image"
            onChange={(e)=>{
              handleChange(e, 1)
            }}
            contrast
          />
         </MDBCol>
      </MDBRow>

      <textarea value={blog.shortDesc} name="shortDesc" row="4" className="textarea mb-4" placeholder="Short Description (Max 80 Characters)" maxLength="80" onChange={handleChange}></textarea>
    
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE}
        textareaName="Body"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(newText) =>
          setBlog({ ...blog, desc: newText })
        }
        initialValue={ isEdit? blog.desc : ""}
      />

      <MDBRow className='mb-5 mt-4'>
      <MDBCol md="2">
        <MDBCheckbox  
          id='fea'
          label='Featured'
          defaultChecked
          name="featured"
          checked={blog.featured}
          onChange={()=>{
            handleChangeCheckbox("featured", !blog.featured)
          }}
          contrast
        />
      </MDBCol>
      <MDBCol md="2">
        <MDBCheckbox
          id='high'
          label='Highlighted'
          name="highlighted"
          checked={blog.highlighted}
          onChange={()=>{
            handleChangeCheckbox("highlighted", !blog.highlighted)
          }}
          contrast
        />
      </MDBCol>
      </MDBRow>
      {isEdit ? (
      <MDBBtn className='mb-5' color="secondary" type='submit' block>
        Edit Blog
      </MDBBtn>
      ) : (
      <MDBBtn className='mb-5' type='submit' block>
        Upload Blog
      </MDBBtn>
      )}
    </form>
    </>
  );
}