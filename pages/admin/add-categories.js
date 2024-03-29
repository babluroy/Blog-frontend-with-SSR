import React from 'react'
import AddCategoryForm from '../../Components/AddCategories'
import AdminBaseLayout from "../../Components/AdminBaseLayout"

export default function AddCategories() {
  return (
    <AdminBaseLayout>
      <div className='admin-custom-margin'>
        <AddCategoryForm/>
      </div>
    </AdminBaseLayout>
  )
}
