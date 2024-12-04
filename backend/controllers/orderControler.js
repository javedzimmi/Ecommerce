const Order = require("../model/orderModel");
const Product = require("../model/productModel");

//order 
exports.newOrder = async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,

        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    })
};


//get single oreder
exports.getSingleOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });  // First response sent here
        } else {
            res.status(200).json(order);  // Second response sent here, causing the error
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });  // Third response sent here, causing the error
    }
};


//get logged id user orders
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    })

};


//get logged id user orders --admin
exports.getAllOrders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;

    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
};

//update orders status--admin
exports.updateOrders = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "Order not found"
            });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                msg: "You have already delivered this product"
            });
        }

        // Update stock for each orderItem
        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }

        // Update order status
        order.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        // Save order with updated status
        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            msg: "Order updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
};

// Update stock for a product
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`Product not found with id: ${id}`);
    }
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}



//Delete order status--admin
exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        res.status(404).json({ message: 'Order not found' }); 
    }
  

    res.status(200).json({
        success: true,
       
    })
};
