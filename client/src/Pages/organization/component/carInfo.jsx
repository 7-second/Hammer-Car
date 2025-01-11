import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrgCarInfo = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = localStorage.getItem("organization_data");
  const currentUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const getCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}car`,
          {
            params: {
              userType: "organization", // Specify the user type
              organizationId: currentUser._id, // Pass the organization ID
            },
          }
        );

        // Log the response data to verify the structure
        console.log("Fetched Cars:", response.data);

        // Filter cars based on type (rent and sell)
        setCars(response.data); // Update state with all cars for this organization
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || err?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [currentUser, navigate]);

  // Handle car deletion
  const handleDelete = async (carId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}car/${carId}`);
      // Remove the deleted car from the state
      setCars(cars.filter((car) => car._id !== carId));
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("Failed to delete car.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">Organization Cars (Rent & Sell)</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : cars.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Car Brand</th>
                <th className="p-4 text-left">Car Model</th>
                <th className="p-4 text-left">Year</th>
                <th className="p-4 text-left">Car Type</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{car.carBrand}</td>
                  <td className="p-4">{car.carModel}</td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4">{car.carType}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No cars available for rent or sale.</p>
      )}
    </div>
  );
};

export default OrgCarInfo;
