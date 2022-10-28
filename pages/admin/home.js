import React from 'react'
import CreateBlogForm from '../../Components/CreateBlogForm'
import AdminBaseLayout from "../../Components/AdminBaseLayout"

export default function home() {
  return (
    <>
      <AdminBaseLayout>
        <CreateBlogForm/>
      </AdminBaseLayout>
    </>
  )
}
