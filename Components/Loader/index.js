import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';
import style from "./index.module.css"

export default function Loader({loader}) {
    return (
    <>
        {loader ? (
            <div className={style.container}>
              <div className={style.containerBody}>
                <MDBSpinner color='light' grow style={{ width: '3rem', height: '3rem' }}/>
               </div>
            </div>
        ): ""}
    </>
    )
}
