import React, { useEffect, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import Sell from '../Car card/sellcard';

const Sellall = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 12;

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car`);
        const allCars = response?.data || [];

        // Log carType to ensure it's as expected
        allCars.forEach(car => console.log(car.carType));

        const rentedCars = allCars.filter((car) => car.carType === "sell");

        // Set totalPages based on rentedCars and carsPerPage
        setTotalPages(Math.ceil(rentedCars.length / carsPerPage));

        // Set the current list of cars for the current page
        setCars(rentedCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage));
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [currentPage]); // Add currentPage as dependency to refetch when page changes

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full ">
      <div className="flex justify-center w-full items-center">
        <h2 className="text-sm font-medium bg-orange-400 px-[30px] py-[20px] rounded">
          Rented Cars
        </h2>
      </div>

      {/* Cars List */}
      <div className="flex flex-wrap gap-4 mb-1 justify-center md:gap-5">
        {cars.length === 0 ? (
          <div className="h-48 flex items-center justify-center w-full">
            No rented cars found
          </div>
        ) : (
          cars.map((car) => (
            <Sell key={car._id} car={car} />
          ))
        )}

        {loading && (
          <div className="h-48 flex items-center justify-center w-full">
            <BiLoader className="animate-spin" size={30} />
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Sellall;
