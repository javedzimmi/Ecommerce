import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import Loader from "../layout/loader/Loader";
import Product from "../home/Product";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";  // Import useParams
import Header from '../layout/Header/Header';
import Footer from '../layout/footer/Footer';

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(state => state.products);

    // Use useParams hook to get the keyword from the URL
    const { keyword } = useParams();  // Destructure the keyword from the params

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword));  // Pass keyword as a parameter
    }, [dispatch, error, alert, keyword]);  // Add keyword to the dependency array

    return (
        <Fragment>
            <Header />
            <div className="container" id="container">
                {loading ? (
                    <Loader />  // Display loader while data is loading
                ) : (
                    products && products.length > 0 ? (
                        products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    ) : (
                        <p>No products found</p>  // Display a message if no products are found
                    )
                )}
            </div>
            <Footer />
        </Fragment>
    );
};

export default Products;
