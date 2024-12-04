import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader.js"


import {useAlert} from "react-alert";



const Home = () => {

    const alert= useAlert();

    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(state => state.products);
    useEffect(() => {

        if(error){

            alert.error(error);
            dispatch(clearErrors());

        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (<Fragment>
                <MetaData title="E-commerce" />
                <div className='banner'>
                    <p>WELCOME TO ECOMMERCE</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href='#container'>
                        <button>
                            Scroll <CgMouse />
                        </button>
                    </a>
                </div>
                <h2 className='homeHeading'>Featured Products</h2>
                <div className='container' id='container'>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
