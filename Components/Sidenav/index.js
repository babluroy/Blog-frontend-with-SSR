import React from 'react'
import Link from 'next/link'
import {url_constants} from "../../utils/routerLink_constants"

export default function SideNav({children}) {
  return (
    <>
          <header>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
              <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                  <ul id="collapseExample1" className="collapse show list-group list-group-flush">
                    <li className="list-group-item py-1">
                      <Link href={url_constants.admin} className="text-reset">Create Blog</Link>
                    </li>
                    <li className="list-group-item py-1">
                      <Link href={url_constants.edit_blog + "?limit=9&pageNumber=1"} className="text-reset">Edit / Delete Blog</Link>
                    </li>
                    <li className="list-group-item py-1">
                      <Link href="#" className="text-reset">Add Categories</Link>
                    </li>
                    <li className="list-group-item py-1">
                      <Link href="#" className="text-reset">Edit / Delete Categories</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
          <main style={{margintop: "58px"}}>
            <div className="container" style={{marginTop: "80px"}}>
              {children}
            </div>
          </main>
    </>
  )
}
