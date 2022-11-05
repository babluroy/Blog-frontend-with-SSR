import React from 'react'
import CreateBlogForm from '../../Components/CreateBlogForm'
import AdminBaseLayout from "../../Components/AdminBaseLayout"
import Layout from '../../Components/Layout';

export default function home() {
  return (
    <Layout>
      <AdminBaseLayout>
        <CreateBlogForm/>
      </AdminBaseLayout>
    </Layout>
  )
}
