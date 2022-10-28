import { useContext, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)

  return (
    <>
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
