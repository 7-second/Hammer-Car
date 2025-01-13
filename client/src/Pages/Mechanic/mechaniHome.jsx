import React, { useState } from 'react';
import axios from 'axios';
import { FaBackward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MechanicHome = () => {
  const [mechanicInfo, setMechanicInfo] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    telegram: '',
    branches: [],
    openingDays: [],
    services: [],
  });

  const [serviceOptions] = useState([
    'Air Filter', 'Engine Repair', 'Brake Services', 'Oil Change', 'Battery Replacement'
  ]);

  const [branchOptions] = useState([
    'Lafto', 'Megenagna', 'Saris', 'Jemo'
  ]);

  const [openingDaysOptions] = useState([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMechanicInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const updatedList = mechanicInfo[name].includes(value)
      ? mechanicInfo[name].filter(item => item !== value)
      : [...mechanicInfo[name], value];

    setMechanicInfo((prev) => ({
      ...prev,
      [name]: updatedList
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/save-mechanic', mechanicInfo);
      console.log(response.data); // Successful submission
      alert('Mechanic profile saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving mechanic profile');
    }
  };

  return (
    <>
      {/* Back to Home Link */}
      <div className="mb-6">
  <Link  to="/mechanicprofile"
    className="flex items-center text-blue-600 font-semibold text-lg hover:text-blue-800 hover:underline py-2 px-4 rounded-lg border border-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
  >
    <FaBackward className="mr-2" />
    Back to Home
  </Link>
</div>

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">

          {/* Mechanic Profile Section */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Update Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-900">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={mechanicInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-lg font-semibold text-gray-900">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={mechanicInfo.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-900">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={mechanicInfo.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Instagram Handle */}
            <div>
              <label htmlFor="instagram" className="block text-lg font-semibold text-gray-900">Instagram Handle</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={mechanicInfo.instagram}
                onChange={handleInputChange}
                placeholder="Enter Instagram handle"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Telegram Handle */}
            <div>
              <label htmlFor="telegram" className="block text-lg font-semibold text-gray-900">Telegram Handle</label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={mechanicInfo.telegram}
                onChange={handleInputChange}
                placeholder="Enter Telegram handle"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Branches Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900">Select Branches</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {branchOptions.map((branch) => (
                  <label key={branch} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="branches"
                      value={branch}
                      checked={mechanicInfo.branches.includes(branch)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{branch}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Opening Days Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900">Select Opening Days</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {openingDaysOptions.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="openingDays"
                      value={day}
                      checked={mechanicInfo.openingDays.includes(day)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <label className="block text-lg font-semibold text-gray-900">Select Services Offered</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={mechanicInfo.services.includes(service)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MechanicHome;
