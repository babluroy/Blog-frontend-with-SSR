import React, { useEffect, useState, Fragment } from 'react';
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

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [blog, setBlog] = useState(initialState)
  const [userId, SetUserId] = useState(null)

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

  useEffect(() => {
    getAllCategories();
    const id = JSON.parse(localStorage.getItem("jwt"))?._id;
    SetUserId(id);
  },[])


  return (
    <>
    <Loader loader={loading}/>
     <h3 className="mb-4">Create Blog</h3>
    <form onSubmit={handleSubmit}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput label='Title' name="title" onChange={handleChange}/>
        </MDBCol>

        <MDBCol>
            <select className="browser-default custom-select dropdown" name="category" disabled={loading} onChange={handleChange}>
              <option defaultValue>Select Category</option>
              {categories.map((value, i)=> (
              <Fragment key={i}>
                <option value={value._id}>{value.name}</option>
              </Fragment>
              ))}
            </select>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBFile 
            label='Choose Cover Image' 
            id='customFile'
            type="file"
            accept="image"
            name="image"
            onChange={(e)=>{
              handleChange(e, 1)
          }}/>
         </MDBCol>
      </MDBRow>

      <textarea name="shortDesc" row="4" className="textarea mb-4" placeholder="Short Description (Max 80 Characters)" maxLength="80" onChange={handleChange}></textarea>
    
      {/* <textarea name="desc" row="4" className="textarea mb-4" placeholder="Write Blog Content" onChange={handleChange}></textarea> */}

      <Editor
        apiKey="ok6okzhtki279c18py4xfd683qcevj1t04mqu0b4crje61kk"
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
      />

      <MDBRow className='mb-5 mt-4'>
      <MDBCol md="2">
        <MDBCheckbox  
          id='fea'
          label='Featured'
          defaultChecked
          name="featured"
          onChange={()=>{
            handleChangeCheckbox("featured", !blog.featured)
          }}
        />
      </MDBCol>
      <MDBCol md="2">
        <MDBCheckbox
          id='high'
          label='Highlighted'
          name="highlighted"
          onChange={()=>{
            handleChangeCheckbox("highlighted", !blog.highlighted)
          }}
        />
      </MDBCol>
      </MDBRow>

      <MDBBtn className='mb-5' type='submit' block>
        Upload Blog
      </MDBBtn>
    </form>
    </>
  );
}