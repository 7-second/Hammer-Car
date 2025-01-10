import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { FaCar, FaGasPump } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from "react-router-dom";
import Sell from "../User/components/Car card/sellcard";
import { BiLoader } from "react-icons/bi"; // Import BiLoader

// CarSearch Component
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Suggestions state
  const [allCars, setAllCars] = useState([]); // Store all cars to restore when search term is cleared
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}car`
        );
        setAllCars(response.data); // Store all cars
        setFilteredCars(response.data); // Initially show all cars
        setLoading(false);
      } catch (err) {
        setError("Failed to load cars data");
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const sanitizedSearchTerm = searchTerm.trim().toLowerCase(); // Trim spaces and convert to lowercase

    // If search term is empty, restore the full list of cars
    if (!sanitizedSearchTerm) {
      setFilteredCars(allCars);
      setSuggestions([]);
    } else {
      // Filter cars based on the search term (case-insensitive)
      const result = allCars.filter(
        (car) =>
          car.carModel.toLowerCase().includes(sanitizedSearchTerm) || // Check by model
          car.carBrand.toLowerCase().includes(sanitizedSearchTerm) // Check by brand
      );
      setFilteredCars(result);

      // Get suggestions based on search term
      const filteredSuggestions = allCars.filter(
        (car) =>
          car.carModel.toLowerCase().includes(sanitizedSearchTerm) || // Check by model
          car.carBrand.toLowerCase().includes(sanitizedSearchTerm) // Check by brand
      );
      setSuggestions(filteredSuggestions); // Update suggestions based on search term
    }
  }, [searchTerm, allCars]); // Dependency array will update on `searchTerm` change

  // Handle suggestion click and update search term to show only carBrand
  const handleSuggestionClick = (car) => {
    setSearchTerm(car.carModel); // Set only carBrand as the search term
    setSuggestions([]); // Hide suggestions after selecting
  };

  // Prevent form submission reset on Enter key press
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold text-center mb-6">Car Search</h1>

          {/* Search Input with Form */}
          <form onSubmit={handleSubmit}> {/* Prevent form submission */}
            <div className="relative flex items-center w-full md:w-1/2 bg-slate-100 p-2 rounded-md shadow-md mb-6">
              <input
                type="text"
                placeholder="Search by car brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 px-4 rounded-md outline-none"
              />
              <CiSearch className="text-2xl text-gray-500 ml-2" />

              {/* Display Suggestions */}
              {searchTerm && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md mt-2 z-10">
                  {suggestions.slice(0, 5).map((car) => (
                    <div
                      key={car._id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(car)}
                    >
                      <p className="font-semibold">
                        {car.carBrand} {car.carModel}
                      </p>
                      <p className="text-sm text-gray-500">Year: {car.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          {/* Loading / Error State */}
          {loading && <div className="text-center">Loading cars...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}

          {/* Display filtered cars */}
          <div className="flex flex-wrap gap-10 w-full">
            {filteredCars.length === 0 ? (
              <div className="h-48 flex items-center justify-center w-full">
                No rented cars found
              </div>
            ) : (
              filteredCars.map((car) => (
                <Sell key={car._id} car={car} />
              ))
            )}

            {loading && (
              <div className="h-48 flex items-center justify-center w-full">
                <BiLoader className="animate-spin" size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
