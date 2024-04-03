// client component
"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
type Props = {}

const Login = (props: Props) => {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

    // btn state
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    useEffect(() => {
  if (user.email.length > 0 && user.password.length > 0) {
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

  const onLogin = async () => {
    try {
      // Send POST request to your backend server's Login endpoint
      const response = await axios.post("/api/users/login",user)
      // Handle successful Login (e.g., show success message, redirect user)
      console.log("Login successful:", response.data)
      router.push("/profile")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="text-center min-h-screen  items-center flex flex-col justify-center">
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
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup">Visit Sign Up Page</Link>
    </div>
  )
}

export default Login
