import React from 'react'
import AddCategoryForm from '../../Components/AddCategories'
import AdminBaseLayout from "../../Components/AdminBaseLayout"
import Layout from '../../Components/Layout'

export default function AddCategories() {
  return (
    <Layout>
      <AdminBaseLayout>
          <AddCategoryForm/>
      </AdminBaseLayout>
    </Layout>
  )
}
