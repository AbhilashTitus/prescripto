import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.recipt,
      handler: async (response) => {
        console.log(response)
        try {

          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
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
              {!item.cancelled && item.payment && <button className='sm:min-w-48 border rounded text-green-500 bg-indgo-500 shadow-md'>Paid</button>}
              {!item.cancelled && !item.payment && <button onClick={() => appointmentRazorpay(item._id)} className="w-28 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">Pay Online</button>}
              {!item.cancelled && !item.payment && <button onClick={() => cancelAppointment(item._id)} className="w-28 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"> Cancel</button>}
              {item.cancelled && <button className='sm:min-w-48 border rounded text-red-600 shadow-md'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
