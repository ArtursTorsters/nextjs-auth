// client component
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {};

const Signup = (props: Props) => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSignup = async () => {
    try {
      // Send POST request to your backend server's signup endpoint
      const response = await axios.post("YOUR_SIGNUP_ENDPOINT", user);
      // Handle successful signup (e.g., show success message, redirect user)
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="text-center min-h-screen  items-center flex flex-col justify-center">
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

      <label htmlFor="email">email</label>
      <input
        className="px-2 text-gray-400 border-none outline-none"
        id="email"
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <label htmlFor="password">password</label>
      <input
        className="px-2 text-gray-400 border-none outline-none"
        id="password"
        type="text"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button
        className="border-blue-300 border rounded-lg p-2"
        onClick={onSignup}
      >
        Sign Up
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default Signup;
