import { useContext, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)

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
      <Component {...pageProps} />
      {/* <Footer/> */}
      </UserContext.Provider>
    </>
  )
}

export default MyApp
