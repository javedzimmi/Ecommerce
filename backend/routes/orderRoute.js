const express = require("express");
const { newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders, 
    updateOrders,
    deleteOrder} = require("../controllers/orderControler");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()


router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);


router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin",), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

router.route("/")





module.exports = router;