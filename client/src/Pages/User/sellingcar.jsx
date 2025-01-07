
import React, { useEffect, useState } from 'react'
import Sell from "./components/Car card/sellcard"
// import Link from 'next/link'
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Cars } from '@/helper';


const Sellingcars = () => {

        const [cars, setCars] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const getcar = async () => {
                try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}sell`)
                    setCars(response?.data);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000); // 5 seconds loading time
                }
            };
    
            getcar();
        }, []);

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between px-16'>
                <h2 className='text-sm font-medium text-bold'>Cars for sell</h2>
                <Link to={"/View-all-sell"} className='underline'>View All</Link>
                

                {/* <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link> */}
            </div>
            <div className='gap-8 flex flex-wrap mb-1 ml-[50px]'>
                {/* {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) : */}
                    {cars?.map((car) => (
                        <Sell
                            key={car._id}
                            car={car}
                        />
                    ))
                }
                {loading &&

                    <div className='h-48 flex items-center justify-center w-full'>
                        <BiLoader className='animate-spin' size={30} />
                    </div>
                }

            </div>
        </div>
    )
}

export default Sellingcars