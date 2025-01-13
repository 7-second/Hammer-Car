import React, { useEffect, useState } from 'react';
import Sell from "./components/Car card/sellcard";
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sellingcars = () => {
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
                const sellingCars = allCars.filter(car => {
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

                    return car.carType === "sell"; // Make sure the car is for sale
                });

                // Debugging: log selling cars after filtering
                console.log("Filtered Selling Cars:", sellingCars);
                setCars(sellingCars);
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
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between px-16'>
                <h2 className='text-sm font-medium text-bold'>Cars for Sell</h2>
                <Link to={"/View-all-sell"} className='underline'>View All</Link>
            </div>
            <div className='gap-8 flex flex-wrap mb-1 ml-[50px]'>
                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        <p>No cars found or owners not found.</p>
                    </div>
                ) : (
                    cars.map((car) => (
                        <Sell
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
    );
}

export default Sellingcars;
