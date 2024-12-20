import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrgHome = () => {
  // const [cars, setCars] = useState([]);
  // const [isOwner, setIsOwner] = useState(false);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cars`);
  //       setCars(response.data.cars);
  //       setIsOwner(response.data.isOwner);
  //     } catch (error) {
  //       console.error('Error fetching cars:', error);
  //     }
  //   };

  //   fetchCars();
  // }, []);

  // return (
  //   <>
  //     <div>
  //       <p>Stylish interiors for your dream car.</p>
  //     </div>
  //     <hr className="mt-2" />
  //     <h1 className="text-xl flex md:flex items-center justify-center pb-4 text-3xl font-serif font-bold text-blue-500">Our Feature Cars For Rent</h1>
  //     <div className="flex justify-center md:w-full flex flex-wrap gap-6 mr-16">
  //       {isOwner && cars.length > 0 ? (
  //         cars.map((car) => (
  //           <div key={car._id} className="border p-4 rounded-md shadow-md">
  //             <h2 className="text-lg font-bold">{car.CarBrand} {car.CarModel}</h2>
  //             <p>{car.description}</p>
  //             <p>Price: {car.price}</p>
  //             <p>Location: {car.location}</p>
  //             {/* Add more car details as needed */}
  //           </div>
  //         ))
  //       ) : (
  //         <p>No cars available for rent.</p>
  //       )}
  //     </div>
    
}
export default OrgHome;