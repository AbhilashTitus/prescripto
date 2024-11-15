import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="text-4xl font-bold text-center text-primary mb-6 ">
        All Appointments
      </p>
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 bg-gray-100 border-b">
          <p className="text-center font-semibold text-gray-700">#</p>
          <p className="text-center font-semibold text-gray-700">Patient</p>
          <p className="text-center font-semibold text-gray-700">Age</p>
          <p className="text-center font-semibold text-gray-700">Date & Time</p>
          <p className="text-center font-semibold text-gray-700">Doctor</p>
          <p className="text-center font-semibold text-gray-700">Fees</p>
          <p className="text-center font-semibold text-gray-700">Action</p>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-300"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={item.userData.image || '/default-avatar.png'}
                    alt="Patient Avatar"
                  />
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                </div>
                <p className="text-center">{calculateAge(item.userData.dob)}</p>
                <p className="text-center">
                  {item.slotDate} <br />
                  <span className="text-sm text-gray-500">{item.slotTime}</span>
                </p>
                <p className="text-center font-medium">{item.docData.name}</p>
                <p className="text-center text-green-600 font-semibold">₹{item.docData.fee}</p>
                <div className="text-center">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md shadow-sm transition-all duration-300"
                    onClick={() => alert('Action clicked!')}
                  >
                    View
                  </button>
                </div>
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
