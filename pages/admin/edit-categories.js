import React,{useState, useEffect} from 'react'
import AdminBaseLayout from "../../Components/AdminBaseLayout"
import ApiService from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import CategoryCard from '../../Components/CategoryCard';
import {MDBRow, MDBCol, MDBContainer} from "mdb-react-ui-kit"

export default function Editcategory() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const get_categories = async() => {
        setLoading(true);
        const api = new ApiService();
        await api.GET_ALL_CATEGORIES().then((res) => {
          setLoading(false);
          setCategories(res.data);
        }).catch((err) => {
          setLoading(false);
          toast.error(err.data);
        })
    }

    useEffect(() => {
        get_categories();
    },[])


  return (
    <>
       <Loader loader={loading}/>
         <AdminBaseLayout>
           <MDBContainer>
           <MDBRow className="mt-5">
            {categories.map((data, index) => (
                <MDBCol md='3' lg='3' sm='12' key={index}>
                <CategoryCard category={data.name}/>
                </MDBCol>
            ))}
            </MDBRow>
            </MDBContainer>
         </AdminBaseLayout>
    </>
  )
}
