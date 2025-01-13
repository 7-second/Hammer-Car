import React from 'react';
import { FaInstagram, FaTelegram } from 'react-icons/fa';

const MechDetail = () => {
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">John Doe</h1>
            <p className="text-lg text-gray-600 mb-4">Expert Mechanic | 10+ Years of Experience</p>

            <div className="flex gap-6 justify-center text-gray-500">
              <div className="flex items-center gap-2">
                <FaTelegram className="text-blue-500" />
                <p>@johnMechanic</p>
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-pink-500" />
                <p>@johnDoeMechanic</p>
              </div>
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
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Lafto</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Megenagna</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Saris</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Jemo</li>
          </ul>
        </div>

        {/* Opening Days */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Opening Days</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Monday</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Tuesday</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Friday</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">985434363</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">Example@gmail.com</li>
            <li className="bg-gray-200 p-4 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-300 transition-all duration-300">+123456789</li>
          </ul>
        </div>
      </div>

      {/* Vehicle Repair Services */}
      <div className="w-full max-w-7xl px-6 mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Vehicle Repair Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Air Filter</h3>
            <p className="text-gray-600">Replace or repair your vehicle's air filter for optimal performance.</p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Engine Repair</h3>
            <p className="text-gray-600">Comprehensive engine repair services to keep your engine running smoothly.</p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Brake Services</h3>
            <p className="text-gray-600">Ensure your safety with our top-notch brake services and repairs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechDetail;
