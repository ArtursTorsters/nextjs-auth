import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Create a JSON response with a success message
        const response = NextResponse.json({
            message: "Logout completed",
            success: true
        });

        // Set a cookie named "token" with an empty value and options for expiration
        response.cookies.set("token", "", {
            httpOnly: true, // Cookie cannot be accessed via JavaScript
            expires: new Date(0) // Expires immediately, effectively removing the cookie
        });
        
        // Return the response
        return response;
    } catch (error: any) {
        // If an error occurs, return a JSON response with the error message
        return NextResponse.json({ error: error.message });
    }
}
