import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import styles from "./index.module.css"

export default function App() {
  return (
    <div className={styles.customFooter}>
    <MDBFooter bgColor='dark' className='text-center text-lg-left mt-5'>
      <div className='text-center text-light p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright
          Intesol Blogs
      </div>
    </MDBFooter>
    </div>
  );
}