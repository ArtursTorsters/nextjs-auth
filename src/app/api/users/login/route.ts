import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

// Connect to the database
connect()

export async function POST(request: NextRequest) {
    try {
        // Parse the JSON data from the request body
        const { email, password } = await request.json()

        // Check if user with provided email already exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: "User does not exist" })
        }

        // Check if the provided password matches the user's password
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ success: false, message: "Incorrect password" })
        }

        // Token data to be included in the JWT token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create a JWT token with the token data and sign it using the secret key
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "2h" })

        // Set the token as an HTTP-only cookie in the response
        const response = NextResponse.json({ success: true, message: "Successfully logged in" })
        response.cookies.set("token", token, { httpOnly: true })

        // Return the response with the token cookie set
        return response
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Login error:", error)
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}
