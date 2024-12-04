const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true,

    },
  
    images: [
        {
            public_id: {
                type: String,
                require: true

            },
            url: {
                type: String,
                require: true
            },
        }
    ],

    category: {
        type: String,
        require: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        require: [true, "please enter product stock"],
        maxLength: [4, "stock cannot exceed 4 character"]

    },
    ratings: {
        type: Number,
        default: 0
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,  // Defines the field type as an ObjectId
            ref: "User",  // The ObjectId will reference the "User" collection/model
            required: true,  // This field is required; it must have a value
        },

        name: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true
        },
        comment: {
            type: String,
            require: true
        },


    }],
    user: {
        type: mongoose.Schema.ObjectId,  // Defines the field type as an ObjectId
        ref: "User",  // The ObjectId will reference the "User" collection/model
        required: true,  // This field is required; it must have a value
    },
    

    createDate: {
        type: Date,
        default: Date.now
    }



})
module.exports = mongoose.model("Product", productSchema);
