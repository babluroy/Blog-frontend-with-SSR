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
    e.preventDefault();
    e.target.reset();
    setLoading(true);
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

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("jwt"))?._id;
    SetUserId(id);
  },[])

  return (
    <>
    <Loader loader={loading}/>
     <h3>
      {isEdit ? "Edit Category" : "Create Category" }
     </h3>
    <form onSubmit={isEdit ? updateBlog : handleSubmit}>
      <MDBRow className='mb-4'>
        <MDBCol md={4}>
          <MDBInput label='Name' name="name" value={category.name} onChange={handleChange} contrast/>
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