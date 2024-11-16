import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="text-4xl font-bold text-center text-primary mb-6">
        All Appointments
      </p>
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-4 px-6 bg-gray-100 border-b items-center">
          <p className="text-center font-semibold text-gray-700">#</p>
          <p className="text-center font-semibold text-gray-700">Patient</p>
          <p className="text-center font-semibold text-gray-700">Age</p>
          <p className="text-center font-semibold text-gray-700">Date & Time</p>
          <p className="text-center font-semibold text-gray-700">Doctor</p>
          <p className="text-center font-semibold text-gray-700">Fees</p>
          <p className="text-center font-semibold text-gray-700">Action</p>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          {/* Appointment Rows */}
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                className="grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-4 px-6 border-b items-center hover:bg-gray-50 transition-all duration-300"
                key={index}
              >
                {/* Index */}
                <p className="text-center">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={item.userData.image || '/default-avatar.png'}
                    alt="Patient Avatar"
                  />
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                </div>

                {/* Age */}
                <p className="text-center">{calculateAge(item.userData.dob)}</p>

                {/* Date & Time */}
                <p className="text-center">
                  {item.slotDate} <br />
                  <span className="text-sm text-gray-500">{item.slotTime}</span>
                </p>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={item.docData.image || '/default-doctor-avatar.png'}
                    alt="Doctor Avatar"
                  />
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                </div>

                {/* Fees */}
                <p className="text-center text-green-600 font-semibold">₹{item.docData.fee}</p>

                {/* Action */}
                {item.cancelled ? (
                  <p className="text-center text-red-500 font-medium">Cancelled</p>
                ) : (
                  <div className="text-center">
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md shadow-sm transition-all duration-300"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
