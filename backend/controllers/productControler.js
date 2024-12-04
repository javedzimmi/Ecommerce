const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apifeatures");

//create product ---admin
const createProduct = async (req, res, next) => {
  try {

    req.body.user = req.user.id;

    // Create the product in the database
    const product = await Product.create(req.body);

    // Send a 201 status code when the product is created
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    // Handle errors, like validation or database issues
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product.',
      error: error.message
    });
  }
};


//get all product

const getAllProduct = async (req, res) => {
  try {

    const resultPerPage = 50;
    const productCount = await Product.countDocuments();


    // Initialize ApiFeatures with Product.find() and request query parameters
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()   // Assuming this method applies search logic (e.g., for keyword)
      .filter()
      .pagination(resultPerPage);  // Assuming this method handles filtering (e.g., price range, other filters)

    // Execute the query
    const products = await apiFeatures.query;

    // Respond with the products
    res.status(200).json({
      success: true,
      products,
      productCount,
    });

  } catch (error) {
    console.error("Error fetching products:", error);

    // Respond with an error message and a 500 status code
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message
    });
  }
};




//product details ---admin
const productDetails = async (req, res, next) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // Check if the product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Send the product details in the response
    res.status(200).json({
      success: true,
      product,
      
    });
  } catch (error) {
    // Handle any errors that occur during the fetching process
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({

      success: false,
      message: "Product not found"
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({

    success: true,
    product

  })
}

const deleteProduct = async (req, res, next) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // Check if the product was found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Remove the product
    await product.deleteOne();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




//review create 

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  // Create a review object
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // Find the product by its ID
  const product = await Product.findById(productId);

  // Check if the product exists
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Check if the user has already reviewed the product
  const isReviewed = product.reviews.some(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update the existing review if already exists
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  // Calculate the new average rating
  const avg = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;

  product.ratings = avg;

  // Save the product with updated reviews and ratings
  await product.save();

  // Send a response indicating success
  res.status(200).json({
    success: true,
    message: "Review submitted successfully",
  });
};


//get all reviews of a product

const getProductReview = async (req, res, next) => {
  const product = await Product.findById(req.query.id);


  if (!product) {

    res.status(404).json({
      success: false,
      msg: "product not found"
    })

  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
}

//delete product review
const deleteProductReviews = async (req, res, next) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    // Filter out the review with the ID provided in the query
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    // Calculate the new average rating
    let avg = 0;
    if (reviews.length > 0) {
      reviews.forEach((rev) => {
        avg += rev.rating;
      });
      avg = avg / reviews.length;
    }

    // Update the number of reviews and product's details
    const noOfReviews = reviews.length;

    // Update the product with the new reviews, average rating, and review count
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,       // New reviews array after deletion
        ratings: avg,  // New average rating
        noOfReviews,   // Updated number of reviews
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    // If the product is successfully updated, return the updated data
    if (updatedProduct) {
      return res.status(200).json({
        success: true,
        product: updatedProduct, // Return the entire updated product (or reviews)
        msg: "Review deleted and product updated successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Failed to update product",
      });
    }
  } catch (error) {
    // Handle any errors during the process
    return res.status(500).json({
      success: false,
      msg: "An error occurred: " + error.message,
    });
  }
};





module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReview,
  deleteProductReviews,


};
