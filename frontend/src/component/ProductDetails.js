import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import the useParams hook
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/ProductAction";
import ReactStars from "react-rating-stars-component";
import "./Product.css"
import { useAlert } from "react-alert";


import ReviewCard from "./ReviewCard.js"
import Loader from './layout/loader/Loader.js';

function ProductDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { id } = useParams();  // Use the hook to get the 'id' from URL params
    // Safely access state with default value, in case productDetails is undefined
    const { product, loading, error } = useSelector(state => state.productDetails || {});

    useEffect(() => {
        if (alert.error.length > 0) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, error, alert]);

    // Show loading or error states if applicable
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)", // Adjusted for better visual
        activeColor: "tomato",
        value: product.ratings, // Default to 0 if ratings are undefined
        isHalf: true,
    };

    return (
        <Fragment>
            {loading ? <Loader /> :
                (<Fragment>
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => {
                                        return (
                                            <img
                                                className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        );
                                    })}
                            </Carousel>
                        </div>
                        <div className='detailsBlock-1'>
                            <h1>{product.name}</h1>
                            <p>Product #{product._id}</p>
                            <div className='detailsBlock-2'>
                                <ReactStars {...options} />
                                <span>({product.noOfReviews} reviews)</span>

                            </div>
                            <div className='detailsBlock-3 '>
                                <h1> ₹ {product.price}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button>-</button>
                                        <input value="1" type='number' />
                                        <button>+</button>

                                    </div>
                                    <button >Add to cart</button>
                                </div>
                                <p>
                                    Status:{""}
                                    <b className={product.stock < 1 ? "redcolor " : "greencolor "}>
                                        {product.stock < 1 ? "outOfStock" : "inStock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-4'>
                                Description:<p>{product.description}</p>

                            </div>
                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    <h3 className='reviewsHeading'> REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}

                        </div>
                    ) : (<p className='noReviews'>
                        No Reviews Yet

                    </p>)}
                </Fragment>)}




        </Fragment>
    );
}

export default ProductDetails;
