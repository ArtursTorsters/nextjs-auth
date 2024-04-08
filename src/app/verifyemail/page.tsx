"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false) 

    // Function to send a request to the backend to verify the user's email
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token }); // Sending POST request to verify email API endpoint
            setVerified(true); // If successful, update state to indicate email is verified
        } catch (error: any) {
            setError(true); // If an error occurs during verification, update state to indicate error
            console.log(error.response.data); // Log the error response data to the console
        }
    }

    // Effect hook to extract token from URL query parameters when component mounts
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]; // Extract token from URL query parameters
        setToken(urlToken || ""); // Update state with token value, or empty string if no token present
    }, []);

    // Effect hook to verify user's email when token changes
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail(); // Call verifyUserEmail function when token changes
        }
    }, [token, verifyUserEmail]); // Include verifyUserEmail in the dependency array to ensure it's called when token changes

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && ( // If email is verified, display success message and login link
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && ( // If an error occurred during verification, display error message
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    );
}
