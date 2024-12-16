
import React, { useEffect, useState } from 'react'

// import Link from 'next/link'
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rent from '../../components/Car card/rentCard';
// import { Cars } from '@/helper';


const Rentedcars = () => {

    // Get All cars
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getcar = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car/rent`)
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



            <div className='flex flex-col gap-1 pb-[10px]'>
                <div className='flex justify-between'>
                    <h2 className='text-sm font-medium'>Renting Cars</h2>
                    <Link to={'/View-all-rent'} className='underline'> View All</Link>

                    {/* <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link> */}
                </div>
                <div className='gap-4 flex overflow-x-auto w-full mb-1'>
                    {/* {cars?.length === 0 ? (
                        <div className='h-48 flex items-center justify-center w-full'>
                          
                        </div> */}
                    
                       {cars?.map((car) => (
                            <Rent
                                key={car._id}
                                car={car}
                            />
                      ) )}
                      
                    {loading &&

                        <div className='h-48 flex items-center justify-center w-full'>
                            <BiLoader className='animate-spin' size={30} />
                        </div>
                    }

                </div>
            </div>
        </>)

}

export default Rentedcars