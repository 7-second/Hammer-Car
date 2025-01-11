import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OrgSale = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = localStorage.getItem("organization_data");
  const currentUser = user ? JSON.parse(user) : null;

  // Ref to track if the data has been fetched already
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Prevent refetching if the data has already been fetched
    if (hasFetchedRef.current) return;

    const getCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}car`,
          {
            params: {
              userType: "organization",
              organizationId: currentUser._id, // Pass the organization ID
            },
          }
        );

        // Filter the cars to only show those with carType === "sell" and the correct owner
        const sellCars = response.data.filter(
          (car) => car.carType === "sell" && car.owner._id === currentUser._id
        );

        setCars(sellCars); // Update the state with filtered cars
        hasFetchedRef.current = true; // Mark the fetch as done
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || err?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [currentUser, navigate]); // Only run once when `currentUser` is available

  return (
    <div className="container mx-auto p-4">
      {currentUser && (
        <>
          <div
            className="relative bg-cover bg-center h-96"
            style={{
              backgroundImage: `url(${currentUser.coverPicture || '/path/to/default/image.jpg'})`
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Welcome</h1>
              <h2 className="text-2xl font-semibold">{currentUser.username}</h2>
              <Link
                to="/contact"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center my-8">Organization Car Sales</h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                >
                  <img
                    src={car.images[0]?.url || '/path/to/default-car.jpg'}
                    alt={car.carModel}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{car.carModel}</h2>
                    <p className="text-gray-600">{car.carBrand}</p>
                    <p className="text-gray-600">Price: {car.price}</p>
                    <p className="text-gray-600">Location: {car.location}</p>
                    <Link
                      to={`/car/${car._id}`}
                      className="text-blue-500 hover:underline mt-2 block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No cars are currently listed for sale. 
              <Link to="/add-car" className="text-blue-500 underline">Add a car</Link>
              to get started!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default OrgSale;
