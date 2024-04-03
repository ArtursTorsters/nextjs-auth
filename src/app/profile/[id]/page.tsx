import React from 'react'

type Props = {

    
}
// this page will grab anything behind /    like this:  http://localhost:3000/profile/thisisatest
const userProfile = ({params}: any) => {
  return (
    <><div>Profile</div>
    <p className='text-4xl'>Profile{params.id}</p>
    </>
  )
}

export default userProfile