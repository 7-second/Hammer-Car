import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RentalList = () => {
  const [cars, setCars] = useState([]);
  const [sellCount, setSellCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get current user and organization details from localStorage
  const user = JSON.parse(localStorage.getItem("users_data"));
  const organizationId = user?.organizationId; // Assuming 'organizationId' is stored in the user data

  useEffect(() => {
    const getCars = async () => {
      try {
        // Fetch all cars
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car`);
        const allCars = response?.data;

        let currentUser;
        const user = localStorage.getItem("organization_data");
        if (user) {
          currentUser = JSON.parse(user);
        }

        // Filter cars based on the organization ID
        const orgCars = allCars.filter(car => car.owner === currentUser._id  & car.carType === "rent") // Assuming `owner` is the organization ID in the car data
        setCars(orgCars);
         
        const count = orgCars.length;
        setSellCount(count);


      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Organization ID from localStorage:", organizationId);
    getCars();
  }, [organizationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/hd/black-car-4k-wnfjwxcbybpwbs08.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Car Hammer</h1>
          <p className="text-lg mb-6">Your trusted partner for car sales and rentals</p>
          <Link
            to="/contact"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="mt-2">
      <p className='bg-blue-500 px-2 rounded-lg text-white'>Total Cars for rent: {sellCount}</p> {/* Display the count */}
   
    </div>
      {loading ? (
        <p className="text-center ">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading cars: {error.message}</p>
      ) : (
        <div className="flex flex-wrap justify-center w-full items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
   

          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car._id}
                className="bg-white mt-6 w-[250px] h-96 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <div className="d">
                <img
                  src={car.images[0]?.url}
                  alt={car.carModel}
                  className="w-full h-72 object-cover"
                />
                </div>
               
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
            ))
          ) : (
            <p className="text-center col-span-3">No cars available for rent.</p>
          )}
        </div>
      )}
    </div>
  
      
 </>
  );
};

export default RentalList;








