import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">All Doctors</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          doctors.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
              <img src={item.image} alt={item.name} className="w-24 h-24 mx-auto object-cover rounded-full border-2 border-primary shadow-md mb-4" />

              <div className="text-center space-y-2">
                <p className="text-xl font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>

                <div className="flex items-center justify-center mt-4 space-x-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <p className="text-gray-700">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default DoctorsList