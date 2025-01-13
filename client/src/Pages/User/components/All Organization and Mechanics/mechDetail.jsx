import React, { useEffect, useState } from 'react';
import { FaInstagram, FaTelegram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MechDetail = () => {
  const { username } = useParams(); // Get the mechanic's username from the URL
  const [mechanicInfo, setMechanicInfo] = useState(null); // State for mechanic data

  // Fetch mechanic data on component mount
  useEffect(() => {
    const fetchMechanicInfo = async () => {
      try {
        // Corrected the API URL structure
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user/${username}?role=mechanic`); 
        setMechanicInfo(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching mechanic data:', error);
      }
    };

    fetchMechanicInfo();
  }, [username]); // Re-fetch when the mechanic's username changes

  if (!mechanicInfo) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12">
      {/* Mechanic Profile Section */}
      <div className="w-full max-w-7xl px-6">
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <img
            src="https://www.checkatrade.com/blog/wp-content/uploads/2021/07/Feature-mechanic-hourly-rate-uk.jpg"
            alt="Mechanic Image"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>

        {/* Mechanic Info Card */}
        <div className="relative bg-white rounded-xl shadow-xl p-8 -mt-24 z-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{mechanicInfo.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{mechanicInfo.experience}</p>

            <div className="flex gap-6 justify-center text-gray-500">
              {mechanicInfo.telegram && (
                <div className="flex items-center gap-2">
                  <FaTelegram className="text-blue-500" />
                  <p>@{mechanicInfo.telegram}</p>
                </div>
              )}
              {mechanicInfo.instagram && (
                <div className="flex items-center gap-2">
                  <FaInstagram className="text-pink-500" />
                  <p>@{mechanicInfo.instagram}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Branches & Services Section */}
      <div className="w-full max-w-7xl px-6">
        {/* Branches */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Branches</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {mechanicInfo.branches.map((branch) => (
              <li key={branch} className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">
                {branch}
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Days */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Opening Days</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {mechanicInfo.openingDays.map((day) => (
              <li key={day} className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">
                {day}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">
              {mechanicInfo.phone || 'Phone not available'}
            </li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">
              {mechanicInfo.email || 'Email not available'}
            </li>
          </ul>
        </div>
      </div>

      {/* Vehicle Repair Services */}
      <div className="w-full max-w-7xl px-6 mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Vehicle Repair Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {mechanicInfo.services.map((service) => (
            <div key={service} className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{service}</h3>
              <p className="text-gray-600">Service description goes here.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechDetail;
