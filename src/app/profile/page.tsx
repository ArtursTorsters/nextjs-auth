"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      // Update state with user ID
      console.log("test data",res)
      setUserId(res.data.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Call getUserDetails when the component mounts
  useEffect(() => {
    getUserDetails()
  }, [userId])

  return (
    <>
      <div>page</div>
      {/* Render user ID if it's available */}
      {userId && <p>User ID: {userId}</p>}
      <button 
        onClick={logout} 
        className='bg-blue-200 rounded px-4'>
        Logout
      </button>
    </>
  )
}

export default Profile
