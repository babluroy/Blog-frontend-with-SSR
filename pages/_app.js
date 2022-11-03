import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from "next/router";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext';
import Loader from "../Components/Loader"


function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <>
    <Head>
      <title>Intesol Blogs</title>
      <meta name="description" content="Intesol blogs" />
      <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
    </Head>
      <UserContext.Provider value={{user, setUser}}>
      <Layout/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading ? (
        <Loader loader={loading}/>
      ) : 
        <Component {...pageProps} />
      }
      {/* <Footer/> */}
      </UserContext.Provider>
    </>
  )
}

export default MyApp
