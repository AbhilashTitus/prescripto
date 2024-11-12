import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <p className="text-3xl font-semibold text-gray-800 mb-6">My Appointments</p>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div key={index} className="flex gap-6 p-6 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            {/* Doctor Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img src={item.docData.image} alt="Doctor" className="w-full h-full object-cover rounded-lg border-1 border-primary" />
            </div>

            {/* Doctor Details */}
            <div className="flex-1">
              <p className="text-xl font-semibold text-gray-900">{item.docData.name}</p>
              <p className="text-sm text-gray-500 mb-2">{item.docData.speciality}</p>
              <p className="text-sm text-gray-600 font-medium">Address:</p>
              <p className="text-sm text-gray-700">{item.docData.address.line1}</p>
              <p className="text-sm text-gray-700">{item.docData.address.line2}</p>
              <p className="text-sm text-gray-600 font-semibold mt-2">
                <span className="text-gray-500">Date & Time:</span> {item.slotDate} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <button className="w-28 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                Pay Online
              </button>
              <button className="w-28 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200">
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
