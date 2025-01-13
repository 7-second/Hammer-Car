import React, { useEffect, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rent from './components/Car card/rentCard';

const Rentedcars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCar = async () => {
            try {
                // Fetch all cars
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car`);
                const allCars = response?.data;

                // Filter out cars with no owner or deleted/inactive owner
                const rentedCars = allCars.filter(car => {
                    // Debugging: log car and owner data
                    console.log("Car Data:", car);

                    // Check if the car has an owner and that the owner exists and is active
                    if (!car.owner) {
                        console.log("No owner for car:", car);
                        return false; // Skip cars without owners
                    }

                    if (car.owner && car.owner.isActive !== undefined && car.owner.isActive === false) {
                        console.log("Owner is inactive for car:", car);
                        return false; // Skip cars where the owner's isActive is false
                    }

                    return car.carType === "rent"; // Make sure the car is for rent
                });

                // Debugging: log rented cars after filtering
                console.log("Filtered Cars:", rentedCars);
                setCars(rentedCars);
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 5000); // 5 seconds loading time
            }
        };

        getCar();
    }, []);

    return (
        <>
            <div className='flex flex-col gap-1 pb-[10px]'>
                <div className='flex justify-between'>
                    <h2 className='text-sm font-medium'>Renting Cars</h2>
                    <Link to={'/View-all-rent'} className='underline'> View All</Link>
                </div>
                <div className='gap-4 flex overflow-x-auto w-full mb-1'>
                    {cars?.length === 0 ? (
                        <div className='h-48 flex items-center justify-center w-full'>
                            <p>No rented cars available or owners not found.</p>
                        </div>
                    ) : (
                        cars.map((car) => (
                            <Rent
                                key={car._id}
                                car={car}
                            />
                        ))
                    )}

                    {loading && (
                        <div className='h-48 flex items-center justify-center w-full'>
                            <BiLoader className='animate-spin' size={30} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Rentedcars;
