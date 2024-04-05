'use client'

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'




const Profile = () => {
const router = useRouter()

const logout = async () => {
  try {
    // Make a request to logout endpoint
    await axios.get('/api/users/logout')
    // Redirect to the login page after successful logout
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
      <div>page</div>
      <button 
        onClick={logout} 
        className='bg-blue-200 rounded px-4'>
        Logout
      </button>
    </>
  )
}

export default Profile
