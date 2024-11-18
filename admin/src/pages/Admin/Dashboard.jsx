import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-6 p-6 bg-gray-50 rounded-lg shadow-md">
        {/* Stats Section */}
        <div className="flex gap-6 mb-10">
          {/* Card Component */}
          {[
            { icon: assets.doctor_icon, count: dashData.doctors, label: 'Doctors' },
            { icon: assets.appointments_icon, count: dashData.appointments, label: 'Bookings' },
            { icon: assets.patients_icon, count: dashData.patients, label: 'Patients' },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-row items-center flex-1 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img className="w-20 h-20 mr-6" src={stat.icon} alt={`${stat.label} Icon`} />
              <div>
                <p className="text-4xl font-bold text-gray-800">{stat.count}</p>
                <p className="text-lg text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-t-lg border-b">
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} alt="List Icon" className="w-6" />
              <p className="text-lg font-semibold text-gray-700">Latest Appointments</p>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-6">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-lg">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{item.slotDate}</p>
                  </div>
                </div>

                {/* Appointment Status or Cancel Button */}
                <div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium">Cancelled</p>
                  ) : (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
