
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import Header from '../Header/header';
import Rentc from "../Car card/rentCard"
// import { Cars } from '@/helper';


const Rent =() => {

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
         <div className="flex flex-row">
        {/* <div className="w-[400px]  shadow-lg mt-[10px]  ">
        <div className="">Rules to be follow</div>
            <div className="w-[400px] flex flex-wrap gap-1 z-0">
                <div className="shadow-2xl w-[150px]  ">You must be at least 25 years old, and sometimes 21, depending on the rental company</div>
                <div className="shadow-2xl w-[150px]">You must have a valid driver's license</div>
                <div className="shadow-2xl w-[150px]">Most rental companies include basic insurance in their rates</div>
                <div className="shadow-2xl w-[150px]">It's important to choose a vehicle suitable for the terrain you plan to cover</div>
                 <div className="shadow-2xl w-[150px]">Be sure to familiarize yourself with local traffic laws and regulations</div>
            </div>

        </div> */}
        <div className='flex flex-col gap-1 '>
            <div className='flex justify-center mt-[5px]'>
                <h2 className='text-sm font-medium w-fit bg-blue-400 px-[30px] py-[20] rounded'>Renting Cars</h2>
                {/* <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link> */}
            </div>
            <div className='ml-[10px] gap-8 flex flex-wrap mb-1'>
                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) :
                    cars?.map((car) => (
                        <Rentc
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
        </div>
        </> )

}
export default Rent