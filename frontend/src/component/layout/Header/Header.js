import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: 'rgb(34, 33, 33)' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h2 className=" fs-2 roboto me-5">ECOMMERCE</h2>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5 ">
                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active text-white" aria-current="page" href="#">product</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link text-white" href="#">About</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link text-white" href="#">Contact</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
