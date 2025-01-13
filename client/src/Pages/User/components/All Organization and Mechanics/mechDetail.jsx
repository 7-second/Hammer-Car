import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTelegram } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

const MechDetail = () => {
  const { id } = useParams();
  const [mechanicInfo, setMechanicInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("ID is not defined!");
      return;
    }

    const fetchMechanicInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=mechanic&id=${id}`
        );
        console.log("Mechanic Data:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setMechanicInfo(response.data[0]);
        } else {
          setMechanicInfo(null);
        }
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
      }
    };

    fetchMechanicInfo();
  }, [id]);

  if (!mechanicInfo) return <p className="text-center text-gray-500">Loading...</p>;

  const {
    name,
    experience,
    telegram,
    instagram,
    branches = [],
    openingDays = [],
    services = [],
    phone,
    email,
  } = mechanicInfo;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-xl rounded-xl space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-lg"
          src={mechanicInfo.coverPicture || "https://via.placeholder.com/600x200"}
          alt="Cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-40"></div>
        <div className="absolute top-20 left-6">
          <img
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            src={mechanicInfo.profilePicture || "https://via.placeholder.com/150"}
            alt={name}
          />
        </div>
      </div>

      {/* Mechanic Info Section */}
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-lg">Experience: {experience} years</p>
        <div className="flex gap-6 items-center text-xl text-gray-200">
          {phone && (
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-2xl" />
              <p>{phone}</p>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-2xl" />
              <p>{email}</p>
            </div>
          )}
        </div>
        <div className="flex gap-6 mt-4">
          {telegram && (
            <a
              href={`https://t.me/${telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-2"
            >
              <FaTelegram className="text-2xl" />
              Telegram: @{telegram}
            </a>
          )}
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline flex items-center gap-2"
            >
              <FaInstagram className="text-2xl" />
              Instagram: @{instagram}
            </a>
          )}
        </div>
      </div>

      {/* Branches Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Branches</h2>
        {branches.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {branches.map((branch, index) => (
              <li key={index} className="text-gray-100">{branch}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-100">No branches available</p>
        )}
      </div>

      {/* Opening Days Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Opening Days</h2>
        {openingDays.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {openingDays.map((day, index) => (
              <li key={index} className="text-gray-100">{day}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-100">No opening days available</p>
        )}
      </div>

      {/* Services Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Services</h2>
        {services.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {services.map((service, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-100">
                <BsFillGearFill className="text-xl text-gray-300" />
                {service}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-100">No services available</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300">
          Contact Now
        </button>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300">
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default MechDetail;
