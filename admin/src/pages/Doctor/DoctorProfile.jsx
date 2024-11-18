import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="flex justify-center w-full min-h-screen py-10 bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={profileData.image || "/default-avatar.png"}
            alt="Doctor"
            className="w-28 h-28 rounded-md border border-gray-300 object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-lg text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium shadow-sm">
                {profileData.experience} years of experience
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">About:</h3>
          <p className="text-gray-600 leading-relaxed">{profileData.about}</p>
        </div>

        {/* Fee and Address Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Appointment Fee</h3>
            {isEdit ? (
              <input
                type="number"
                className="border rounded p-2 w-full"
                value={profileData.fee || 0}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fee: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-600">
                $ <span className="font-bold">{profileData.fee || 0}</span>
              </p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600 leading-relaxed">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    className="border rounded p-2 w-full mb-2"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address?.line1 || ""}
                  />
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address?.line2 || ""}
                  />
                </>
              ) : (
                <>
                  {profileData.address?.line1 || "N/A"}
                  <br />
                  {profileData.address?.line2 || ""}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Availability and Edit Section */}
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={profileData.available}
              className="w-5 h-5 accent-green-600"
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label className="text-gray-800 font-medium">Available</label>
          </div>
          <button
            className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition-all"
            onClick={() => {
              if (isEdit) {
                updateProfile();
              } else {
                setIsEdit(true);
              }
            }}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
