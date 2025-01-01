import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrgHome = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car`);
                setCars(response?.data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Car Hammer</h1>
                    <p className="text-lg mb-6">Your trusted partner for car sales and rentals</p>
                    <Link to="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Contact Us
                    </Link>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center my-8">Organization Car Sales and Rentals</h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error loading cars: {error.message}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                                <img src={car.images[0]?.url} alt={car.CarModel} className="w-full h-72 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800">{car.CarModel}</h2>
                                    <p className="text-gray-600">{car.CarBrand}</p>
                                    <p className="text-gray-600">Price: {car.price}</p>
                                    <p className="text-gray-600">Location: {car.location}</p>
                                    <Link to={`/car/${car._id}`} className="text-blue-500 hover:underline mt-2 block">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-3">No cars available for rent.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrgHome;