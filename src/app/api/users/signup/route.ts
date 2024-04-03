import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
//  creating new user on signup


connect() 

export async function POST(request: NextRequest) {
    try {
        // Parsing request body as JSON
        const requestBody = await request.json();
        const { username, email, password } = requestBody;
        console.log("REQUEST BODY", requestBody)

        // Check if user with provided email already exists in the database
        const user = await User.findOne({ email })
        if (user) {
            // If user  exists return an error response
            return NextResponse.json({ error: "User already exists" });
        }

        // Hashing the password using bcryptjs
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Creating a new User instance with provided details
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Saving the new user to the database
        const savedUser = await newUser.save()

        // Returning success response
        return NextResponse.json({ message: "User registered successfully" })
    } catch (error: any) {
        // Catching and handling errors
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
