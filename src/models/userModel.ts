// Importing mongoose for MongoDB interactions
import mongoose from "mongoose"

// Defining user schema using mongoose.Schema
const userSchema = new mongoose.Schema({
    // username field
    username: {
        type: String,
        required: [true, "Provide username"]
    },
    // email field
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    // password field
    password: {
        type: String,
        required: [true, "Provide password"],
    },
    // is the user verified?
    isVerified: {
        type: Boolean,
        default: false,
    },
    // is he admin?
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPassword: String,
    forgotPasswordExpire: Date,
    verifiedToken: String,
    verifyTokenExpired: String,
})

// Creating User model using the userSchema defined above
// If 'users' collection exists, use it, otherwise create a new collection named 'User'
const User = mongoose.models.users || mongoose.model("User", userSchema)

export default User
