import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "./Header.css";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();  // Initialize navigate using useNavigate

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!keyword) {
      return
    }
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);  // Use navigate to perform routing
    } else {
      navigate("/products");  // Navigate to products page if no keyword
    }
  };

  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: 'rgb(34, 90, 60)' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h2 className="fs-2 roboto me-5">ECOMMERCE</h2>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5 ">
                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link active text-white" aria-current="page" href="/products">Products</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link text-white" href="#">About</a>
              </li>
              <li className="nav-item  me-5">
                <a className="nav-link text-white" href="#">Contact</a>
              </li>
              <li className="nav-item  me-5">
                <form className="d-flex searchBox" onSubmit={searchSubmitHandler}>
                  <input className="form-control me-2" type="search" placeholder="Search a Product ..." onChange={(e) => setKeyword(e.target.value)} />
                  <input type="submit" className='rounded ' value="Search" />
                </form>
              </li>

            </ul>

            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person"></i>  Admin
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="bi bi-person-square"></i> Profile</a></li>
               
                <li><a class="dropdown-item" href="#"> <i class="bi bi-box-arrow-right"></i> Log Out</a></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
