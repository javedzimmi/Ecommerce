const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: { // Corrected spelling
        address: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        },
        pinCode:{
            type: Number,
            require: true
            // You could add more validation here (e.g., regex for specific formats)
        },
        phoneNo: {
             // Change to string for better flexibility
            type: String,
            require: true
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            image: {
                type: String,
                require: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                require: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    paymentInfo: {
        id: {
            type: String,
            require: true
        },
        status: {
            type: String,
            require: true
        }
    },
    paidAt: {
        type: Date,
        require: true
    },
    itemsPrice: {
        type: Number,
        require: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        require: true,
        default: 0
    },
    shipingPrice: {
        type: Number,
        require: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0
    },
    orderStatus: {
        type: String,
        require: true,
        default: "processing",
        enum: ["processing", "shipped", "delivered", "cancelled"] // Enum for valid order statuses
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);
