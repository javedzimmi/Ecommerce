const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;  // Access token from cookies

    console.log("Token from cookies:", token);  // Debugging line

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: "No token found, authentication failed" });
    }

    try {
        // Verify the token using the JWT_SECRET environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use the secret key you set in your .env file


        // Add the user information (e.g., userId) to the request object
        req.user = await User.findById(decoded.id);  // Assuming you encoded the userId in the token payload

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });  // Handle case where the user doesn't exist in DB
        }

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token verification error:", error);  // Debugging line
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({

                success: false,
                message: `Role ${req.user.role} is not authorized to access this resource`
            })

        };
        next();
    };

};
