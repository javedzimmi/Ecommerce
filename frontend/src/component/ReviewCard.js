import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from "../images/Profile.png"

const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)", // Adjusted for better visual
        activeColor: "tomato",
        value: review.rating, // Default to 0 if ratings are undefined
        isHalf: true,
    };
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt='User'/>
      <p>{review.name}</p>
      <ReactStars {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
