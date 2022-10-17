import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  )
}

export default MyApp
