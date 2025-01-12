import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGasPump, FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';

function Profile({}) {
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [carSelled, setCarSelled] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isOpen, setIsOpen] = useState(false); // state to control modal visibility
  const [selectedCar, setSelectedCar] = useState(null); // state to store the selected car

  let currentUser;
  const user = localStorage.getItem("users_data");
  if (user) {
    currentUser = JSON.parse(user);
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user/show-details/${currentUser._id}`
        );

        setUserData(response.data);
        setFollowedOrganizations(response.data.organizationDetails || []);
        setCarSelled(response.data.sell || []);
      } catch (error) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const openModal = (car) => {
    setSelectedCar(car);  // set the car selected for the modal
    setIsOpen(true);       // open the modal
  };

  const closeModal = () => {
    setIsOpen(false);      // close the modal
    setSelectedCar(null);  // reset selected car
  };

  return (
    <main className="w-full md:px-12 p-6 flex flex-col gap-3 bg-white justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="relative w-full flex flex-row">
            <div className="relative w-full flex flex-col">
              {/* Cover Image */}
              {currentUser?.coverPicture && (
                <img
                  src={currentUser.coverPicture}
                  alt="Cover"
                  className="object-cover rounded-md"
                />
              )}
              {/* Profile Picture */}
              {currentUser?.profilePicture && (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="!w-16 !h-16 absolute bottom-12 left-5 object-cover rounded-full shadow-2xl"
                />
              )}
              <div className="flex flex-col gap-1 mt-6">
                <h2 className="font-bold text-sm text-black">
                  {currentUser.username}
                </h2>
                <p className="text__medium text-black">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex justify-between md:px-8 w-full mt-8"></div>
            {/* Display Followed Organizations */}
            <div className="mt-6 h-64 px-4 shadow-xl w-2/3 overflow-scroll">
              <h3 className="font-bold text-sm">Followed Organizations</h3>
              <ul className="mt-3">
                {followedOrganizations.length > 0 ? (
                  followedOrganizations.map((org) => (
                    <li key={org._id} className="text-lg">
                      <div className="flex gap-3 items-center">
                        <img
                          className="object-cover rounded-full w-10 h-10"
                          src={
                            org.profilePicture ||
                            "https://via.placeholder.com/150"
                          }
                          alt={`${org.username || "Organization"} logo`}
                        />
                        <span>{org.username || "No Name Available"}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No organizations followed yet.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Buy Cars */}
          {carSelled.length > 0 &&
            carSelled.map((sell) => (
              <div key={sell.car.id} className="w-[300px] h-fit min-w-56 p-4 rounded-lg bg-white shadow-2xl">
                <div className="flex flex-col">

                <div className="flex justify-between gap-2">
                    <h3 className="text-lg font-bold whitespace-nowrap text-blue-500">
                      {sell.car.images}
                    </h3>
                    
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <h3 className="text-lg font-bold whitespace-nowrap text-blue-500">
                      {sell.car.carModel}
                    </h3>
                    <p className="font-mono">{sell.car.year}</p>
                  </div>
                  <p className="text-orange-400 opacity-65 font-mono -mt-3">
                    {sell.car.carBrand}
                  </p>
                  <div className="flex flex-row md:justify-between gap-3">
                    <div className="text__medium flex items-center gap-1">
                      <FaGasPump />
                      <span>{sell.car.fuelCapacity}L</span>
                    </div>
                    <div className="text__medium flex items-center gap-1">
                      <GiSteeringWheel />
                      <span>{sell.car.transmission}</span>
                    </div>
                    <div className="text__medium flex items-center gap-1">
                      <FaCar />
                      <span className="whitespace-nowrap">{sell.car.engine}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 gap-x3">
                  <p className="text-xs">ETB {sell.car.price}</p>
                  <button
                    type="button"
                    onClick={() => openModal(sell.car)}  // Pass car to openModal
                    className="btn__bg py-1 px-3 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-300 focus:bg-purple-200"
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Modal for more information */}
      {isOpen && selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCar.carModel}</h2>
            <p>{selectedCar.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
