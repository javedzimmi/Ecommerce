const express = require("express");
const { getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productDetails,
    createProductReview, 
    getProductReview,
    deleteProductReviews} = require("../controllers/productControler");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/products").get(getAllProduct);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


router.route("/product/:id").get(productDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteProductReviews);


module.exports = router
