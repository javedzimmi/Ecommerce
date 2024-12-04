const User = require("../model/userModel");
const sendToken = require("../utils/jwToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");





//register user 

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Create the user in the database
        const user = await User.create({
            name,
            email,
            password, // You should hash the password before saving in the actual implementation
            avatar: {
                public_id: "this is sample id", // Placeholder, replace with actual avatar id
                url: "profilepicurl", // Placeholder, replace with actual avatar URL
            },
        });

        sendToken(user, 200, res);




    } catch (error) {
        // Handle errors, like validation or database issues
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user.',
            error: error.message,
        });


    }

};

//login user 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // If no email and no password provided, return an error
    if (!email && !password) {
        return res.status(400).json({ message: 'Email or password is required.' });
    }

    try {
        // If email is provided, find the user by email
        if (email) {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password.',
                });
            }

            // If password is provided, compare it with the stored hash
            if (password) {
                const isPasswordMatch = await user.comparePassword(password);

                if (!isPasswordMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid email or password.',
                    });
                }
            }

            // If passwords match or only the email is entered, generate a token
            sendToken(user, 200, res);
        } else {
            // If only the password is provided, find the user based on the password
            const user = await User.findOne({ password }).select("+email");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password.',
                });
            }

            // If password is matched but no email is provided, still generate the token
            sendToken(user, 200, res);
        }
    } catch (error) {
        // Handle any other errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

//logout user 

exports.logOut = async (req, res, next) => {
    // Remove the token cookie by setting it to null and expiring it immediately
    res.cookie("token", null, {
        expires: new Date(Date.now()), // Expire the cookie immediately
        httpOnly: true,  // Prevents access to the cookie by JavaScript
        secure: process.env.NODE_ENV === 'production', // Use 'true' only if you're in production with HTTPS
        sameSite: 'Strict', // Helps prevent CSRF attacks
    });

    // Send a response back to indicate the user has logged out
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};




//forgot Password



exports.forgotPassword = async (req, res, next) => {

    // Find user by email
    const { email } = req.body

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // If no token generated, return an error
    if (!resetToken) {
        return res.status(400).json({
            success: false,
            message: "Failed to generate reset token",
        });
    }

    // Save the user with the reset token
    await user.save({ validateBeforeSave: false });

    // Prepare the reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    // Message to be sent in the email
    const message = `Your password reset token is: \n\n ${resetPasswordUrl}\n\nIf you did not request this email, please ignore it.`;

    // Send the email
    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message,
        });

        // Respond with success
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        // In case of failure, clear the reset token

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            res.status(500).json({
                success: false,
                message: "Error in sending email or generating reset token",
                error: error.message,
            })
        );
    }
};




exports.resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "reset password token is invalid or has been expired",
        });
    }
    if (req.body.password !== req.body.confirmPassword) {

        return res.status(400).json({
            success: false,
            message: "password dos not match",
        });
    }
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
};



//user details
exports.getUserDetails = async (req, res, next) => {
    try {
        // Retrieve user details from the database by user ID
        const user = await User.findById(req.user.id);

        // If no user found, return an error response
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found",
            });
        }

        // If user found, return success response with user details
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};

//update user password

exports.updatePassword = async (req, res, next) => {
    try {
        // Retrieve user details from the database by user ID
        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'old password is incorrect ',
            });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'password does not match ',
            });
        }
        user.password = req.body.newPassword;

        await user.save();


        // If user found, return success response with user details
        return res.status(200).json({
            success: true,
            user,
        });


    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};


//update profile 

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body; // Destructure directly
        const newUserData = { name, email };

        // Update the user in the database
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        // If the user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        // Send the updated user data in the response
        res.status(200).json({
            success: true,
            data: user, // Include the updated user object
        });

    } catch (err) {
        console.error(err); // Detailed error logging for debugging
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};

//get all user (admin )

exports.getAllUsers = async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

}

//get single user details (admin )
exports.getSingleUser = async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: `User does not exist with id ${req.params.id}`,
        });

    }

    res.status(200).json({
        success: true,
        user,
    })

}


//update user role  --admin 

exports.updateUserRole = async (req, res, next) => {
    try {
        const { name, email, role } = req.body; // Destructure directly
        const newUserData = { name, email, role };

        // Update the user in the database
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        // If the user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        // Send the updated user data in the response
        res.status(200).json({
            success: true,
            msg: "update succesfull"

        });

    } catch (err) {
        console.error(err); // Detailed error logging for debugging
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};


//delete user   ---admin 
exports.deleteUser = async (req, res, next) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: `User does  not exist with id ${req.params.id}`,
            });
        }

   
        // Send the updated user data in the response
        res.status(200).json({
            success: true,
            msg: "delete succesfull"
        });

    } catch (err) {
        console.error(err); // Detailed error logging for debugging
        return res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};