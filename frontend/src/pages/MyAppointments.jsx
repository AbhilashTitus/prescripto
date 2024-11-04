import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <p className="text-2xl font-semibold text-gray-800 mb-6">My Appointments</p>
      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div key={index} className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Doctor Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img src={item.image} alt="Doctor" className="w-full h-full rounded-md object-cover border-4 border-primary" />
            </div>

            {/* Doctor Details */}
            <div className="flex-1">
              <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 mb-2">{item.speciality}</p>
              <p className="text-sm text-gray-600 font-semibold">Address:</p>
              <p className="text-sm text-gray-700">{item.address.line1}</p>
              <p className="text-sm text-gray-700">{item.address.line2}</p>
              <p className="text-sm text-gray-600 font-semibold mt-2">
                <span className="text-gray-500">Date & Time:</span> 25, July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <button className="w-32 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition duration-200">
                Pay Online
              </button>
              <button className="w-32 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-200">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}

export default MyAppointments