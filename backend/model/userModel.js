const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your Name"],
        maxLength: [30, "name cannot exceed 30 character"],
        minLength: [4, "name should have more than 4 character"]
    },
    email: {

        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid Eamil"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "password should be greater than 8 character "],
        select: false,


    },
    avatar: {
        public_id: {
            type: String,
            require: true

        },
        url: {
            type: String,
            require: true
        },
    },
    role: {
        type: String,
        default: "user",


    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();

    }
    this.password = await bcrypt.hash(this.password, 10);
})
//JWT TOKEN 

userSchema.methods.getJWTToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JET_EXPIRE,
    })
}
//compare password 

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)


}


//generating password reset token 
userSchema.methods.getResetPasswordToken = function () {
    try {
        // Generate the random token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash the token and set expiration time
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        // Return the plain token
        return resetToken;          
    } catch (error) {
        console.error('Error generating reset password token:', error);
        throw new Error('Failed to generate reset password token');
    }
};


module.exports = mongoose.model("user", userSchema);
