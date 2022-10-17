import React from 'react'

export default function SideNav({children}) {
  return (
    <>
          <header>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
              <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                  <ul id="collapseExample1" className="collapse show list-group list-group-flush">
                    <li className="list-group-item py-1">
                      <a href="#" className="text-reset">Create Blog</a>
                    </li>
                    <li className="list-group-item py-1">
                      <a href="#" className="text-reset">Edit / Delete Blog</a>
                    </li>
                    <li className="list-group-item py-1">
                      <a href="#" className="text-reset">Add Categories</a>
                    </li>
                    <li className="list-group-item py-1">
                      <a href="#" className="text-reset">Edit / Delete Categories</a>
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
