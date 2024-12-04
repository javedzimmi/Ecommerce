import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css";

const Product = ({ product }) => {
    // Define options for the ReactStars component
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)", // Adjusted for better visual
        activeColor: "tomato",
        value: product.ratings || 0, // Default to 0 if ratings are undefined
        isHalf: true,
    };

    // Ensure that images array exists and has at least one image
    const imageUrl = product.images && product.images[0] ? product.images[0].url : "default_image_url.jpg"; // Fallback image

    return (
        <>
            <Link className='productCard' to={`/product/${product._id}`}>
                <img src={imageUrl} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options} />
                    <span>({product.noOfReviews} reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link>
        </>
    );
};

export default Product;
