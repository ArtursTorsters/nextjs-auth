// client component
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// component handles user input and renders singup form
type Props = {};

const Signup = (props: Props) => {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  // btn state
const [buttonDisabled, setButtonDisabled] = React.useState(false)

useEffect(() => {
  if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    console.log("disabled")
    setButtonDisabled(false)
  } else {
    setButtonDisabled(true)
  }
}, [user])// Run the effect whenever 'user' state changes



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const onSignup = async () => {
    try {
      // Send POST request to your backend server's signup endpoint
      const response = await axios.post("/api/users/signup", user)
      // Handle successful signup (e.g., show success message, redirect user)
      console.log("Signup successful:", response.data)
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

 // Conditionally render the signup button based on buttonDisabled state
 const renderSignupButton = () => {
  if (buttonDisabled) {
    return (
      <button className="border-blue-300 border rounded-lg p-2" disabled>
        Sign Up
      </button>
    )
  } else {
    return (
      <button className="border-blue-300 border hover:bg-blue-100 hover:text-blue-600 rounded-lg p-2" onClick={onSignup}>
        Sign Up
      </button>
    )
  }
}

return (
  <div className="text-center min-h-screen items-center flex flex-col justify-center">
    <label htmlFor="username">Username</label>
    <input
      className="px-2 text-gray-400 border-none outline-none"
      id="username"
      type="text"
      name="username"
      value={user.username}
      onChange={handleInputChange}
      placeholder="User"
    />

    <label htmlFor="email">Email</label>
    <input
      className="px-2 text-gray-400 border-none outline-none"
      id="email"
      type="text"
      name="email"
      value={user.email}
      onChange={handleInputChange}
      placeholder="Email"
    />
    <label htmlFor="password">Password</label>
    <input
      className="px-2 text-gray-400 border-none outline-none"
      id="password"
      type="password"
      name="password"
      value={user.password}
      onChange={handleInputChange}
      placeholder="Password"
    />
    {renderSignupButton()}
    <Link href="/login">Visit Login Page</Link>
  </div>
);
};

export default Signup;
