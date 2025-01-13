import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGasPump, FaCar } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { toPng } from "html-to-image";

function Profile() {
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [carSelled, setCarSelled] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("users_data") || "{}");

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

  const generateReceipt = (car) => {
    const newReceipt = {
      buyer: currentUser.username,
      carModel: car.carModel,
      carBrand: car.carBrand,
      price: car.price,
      date: new Date().toLocaleDateString(),
      fuelCapacity: car.fuelCapacity,
      transmission: car.transmission,
      engine: car.engine,
      id: car._id,
    };

    setReceipt(newReceipt);
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  const downloadAsImage = async () => {
    const content = document.getElementById("receipt-content");
    try {
      const dataUrl = await toPng(content);
      const link = document.createElement("a");
      link.download = "receipt.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  return (
    <main className="w-full md:px-12 p-6 flex flex-col gap-6 bg-gray-50 justify-center items-center">
      {loading ? (
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* User Header */}
          <div className="w-full flex flex-col items-center bg-white shadow rounded-lg p-6">
            {currentUser.coverPicture && (
              <img
                src={currentUser.coverPicture}
                alt="Cover"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            {currentUser.profilePicture && (
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-20 h-20 -mt-10 border-4 border-white object-cover rounded-full shadow-md"
              />
            )}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{currentUser.username}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>

          {/* Cars for Sale */}
          <div className="w-full flex flex-wrap gap-6">
            {carSelled.length > 0 ? (
              carSelled.map((sell) => (
                <div
                  key={sell.car.id}
                  className="w-72 bg-white shadow-lg rounded-lg p-4"
                >
                  {sell.car.images.map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt="Car Image"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {sell.car.carModel}
                    </h3>
                    <p className="text-sm text-gray-600">{sell.car.carBrand}</p>
                    <div className="flex justify-between items-center mt-2 text-gray-700">
                      <div className="flex items-center gap-1">
                        <FaGasPump />
                        <span>{sell.car.fuelCapacity}L</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GiSteeringWheel />
                        <span>{sell.car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCar />
                        <span>{sell.car.engine}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-800 font-medium">ETB {sell.car.price}</p>
                    <button
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      onClick={() => generateReceipt(sell.car)}
                    >
                      Generate Receipt
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No cars available for sale.</p>
            )}
          </div>

          {/* Receipt Modal */}
          {receipt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div id="receipt-content" className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">Receipt</h2>
                <p className="mt-2 text-gray-600">
                  <strong>Buyer:</strong> {receipt.buyer}
                </p>
                <p className="mt-2 text-gray-600">
                  <strong>Car Model:</strong> {receipt.carModel}
                </p>
                <p className="mt-2 text-gray-600">
                  <strong>Car Brand:</strong> {receipt.carBrand}
                </p>
                <p className="mt-2 text-gray-600">
                  <strong>Price:</strong> ETB {receipt.price}
                </p>
                <p className="mt-2 text-gray-600">
                  <strong>Date:</strong> {receipt.date}
                </p>
                <p className="mt-2 text-gray-600">
                  <strong>ID:</strong> {receipt.id}
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={downloadAsImage}
                  >
                    Download Image
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={closeReceipt}
                  >
                    Close Receipt
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Profile;
