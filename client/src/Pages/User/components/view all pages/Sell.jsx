
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import Header from '../Header';
import Sell from '../Car card/sellcard';
// import { Cars } from '@/helper';


const Sellall = () => {

    // Get All cars
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getcar = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}sell`)
                setCars(response?.data)
                // let getAllCars = response?.getAllCars
            } catch (error) {
                console.log(error);

            }
            finally { setLoading(false) }
        }

        getcar()
    }, [])

    return (
        <>
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium text-bold'>Cars for sell</h2>
                {/* <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link> */}
            </div>
            <div className='ml-[60px] gap-4 flex flex-wrap mb-1'>
                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) :
                    cars?.map((car) => (
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
        </> )
}

export default Sellall