import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "John Doe",
    Image: assets.profile_pic,
    email: "john.doe@example.com",
    phone: '5481727891254',
    address: {
      line1: "123 Main Street",
      line2: "New York"
    },
    gender: 'Male',
    dob: '2000-01-20'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
  <div className="flex flex-col items-center gap-4">
    {/* Profile Image */}
    <img src={userData.Image} alt="Profile" className="w-24 h-24 rounded-full border-4 border-primary object-cover" />

    {/* Name */}
    {isEdit ? (
      <input
        type="text"
        value={userData.name}
        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
        className="text-center text-2xl font-semibold text-gray-800 border-b-2 focus:border-primary transition duration-200"
      />
    ) : (
      <p className="text-2xl font-semibold text-gray-800">{userData.name}</p>
    )}
  </div>

  <hr className="my-6" />

  {/* Contact Information */}
  <div className="space-y-4">
    <p className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</p>

    <div className="space-y-2">
      <p className="text-sm text-gray-500">Email:</p>
      <p className="text-primary">{userData.email}</p>

      <p className="text-sm text-gray-500">Phone:</p>
      {isEdit ? (
        <input
          type="text"
          value={userData.phone}
          onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <p className="text-gray-700">{userData.phone}</p>
      )}

      <p className="text-sm text-gray-500">Address:</p>
      {isEdit ? (
        <div className="space-y-2">
          <input
            type="text"
            value={userData.address.line1}
            onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
            placeholder="Address Line 1"
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={userData.address.line2}
            onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
            placeholder="Address Line 2"
            className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ) : (
        <p className="text-gray-700">
          {userData.address.line1}
          <br />
          {userData.address.line2}
        </p>
      )}
    </div>
  </div>

  <hr className="my-6" />

  {/* Basic Information */}
  <div className="space-y-4">
    <p className="text-lg font-semibold text-gray-700">BASIC INFORMATION</p>

    <div className="space-y-2">
      <p className="text-sm text-gray-500">Gender:</p>
      {isEdit ? (
        <select
          value={userData.gender}
          onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
          className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ) : (
        <p className="text-gray-700">{userData.gender}</p>
      )}

      <p className="text-sm text-gray-500">Birthday:</p>
      {isEdit ? (
        <input
          type="date"
          value={userData.dob}
          onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
          className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <p className="text-gray-700">{userData.dob}</p>
      )}
    </div>
  </div>

  {/* Save/Edit Button */}
  <div className="flex justify-center mt-6">
    {isEdit ? (
      <button
        onClick={() => setIsEdit(false)}
        className="px-6 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-dark transition duration-200"
      >
        Save Information
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300 transition duration-200"
      >
        Edit
      </button>
    )}
  </div>
</div>

  )
}

export default MyProfile