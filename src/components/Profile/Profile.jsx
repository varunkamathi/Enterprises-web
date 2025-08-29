import React from 'react'

const Profile = () => {
  return (
    <div className='flex min-h-screen bg-gray-100 w-full'>
        <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="w-10 h-10 rounded-full border"
      />
      <span className="font-medium text-gray-700">John Doe</span>
    </div>
  )
}

export default Profile