import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const markCompleted = (appointmentId) => {
    console.log("Marking appointment as completed:", appointmentId);
    // Add functionality here to update the appointment status
  };

  return (
    <div className="dashboard-container w-full max-w-6xl mx-auto p-5">
      <div className="header mb-5">
        <h1 className="text-2xl font-bold text-gray-800">All Appointments</h1>
        <p className="text-gray-600 text-sm">
          View and manage all your scheduled appointments.
        </p>
      </div>

      <div className="appointments-table bg-white shadow-md rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="table-header grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_2fr] gap-4 bg-gray-100 py-3 px-6 text-gray-700 font-medium text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        <div className="table-body max-h-[80vh] min-h-[50vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.reverse().map((item, index) => (
              <div
                key={item._id}
                className="table-row grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_2fr] gap-4 py-3 px-6 border-b items-center text-gray-800 text-sm"
              >
                {/* Serial Number */}
                <p>{index + 1}</p>

                {/* Patient Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={item.userData.image || "/default-avatar.png"}
                    alt="Patient"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p>{item.userData.name}</p>
                </div>

                {/* Payment Method */}
                <p>{item.payment ? "Online" : "Cash"}</p>

                {/* Age */}
                <p>{calculateAge(item.userData.dob)}</p>

                {/* Appointment Date & Time */}
                <p>
                  {new Date(item.date).toLocaleDateString()}{" "}
                  {new Date(item.date).toLocaleTimeString()}
                </p>

                {/* Fee */}
                <p>${item.amount}</p>

                {
                  item.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> : item.isCompleted ? <p className="text-green-400 text-xs font-medium">Completed</p> : <div className="flex space-x-2">
                    {item.cancelled ? (
                      <p className="text-red-500 font-medium">Cancelled</p>
                    ) : (
                      <>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all"
                          onClick={() => cancelAppointment(item._id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-all"
                          onClick={() => completeAppointment(item._id)}
                        >
                          Completed
                        </button>
                      </>
                    )}
                  </div>
                }

                {/* Actions */}

              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
