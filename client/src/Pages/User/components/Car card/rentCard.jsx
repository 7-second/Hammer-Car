"use client"
import { FaHeart } from "react-icons/fa6";
// import { FaGasPump } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";


import { FaGasPump, FaCar } from "react-icons/fa";
// import { CarCardProps } from '@/types';
// import CarDetails from './car-details';
import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import CarDetailrent from "../car detail/carDetailrent";
// import EditCar from './profile/edit-car';


const Rent = ({ variant, car }) => {

    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    const [heart, setHeart] = useState(false)

    return (
        <main>


            <section className='w-full h-[290px] min-w-56 p-4 rounded-lg  bg-white shadow-2xl'>
                <div className='flex flex-col'>
                    <div className='flex justify-between gap-2'>
                        <h3 className='text-sm font-bold whitespace-nowrap text-blue-500'>{car?.carModel}</h3>
                        {/* === Edit own Car */}
                        {/* {variant === "own" ? (
                            <EditCar carID={car?._id} />

                        ) : (
                            
                        )} */}
                       
                       <p className='text-orange-400 font-bold font-mono'> { car?.transmission}</p>

                    </div>
                </div>
                <p className='text-orange-400 font-bold font-mono'>{car?.year}</p>

                <div className={`${variant === "allCars" && "flex md:flex-col"}`}>
                    <div className='-my-2  px-2 relative w-64 h[80px] flex justify-center'>
                        {car?.images &&
                            <img src={`${car?.images ? car?.images[0]?.url : ""}`} alt="Car" fill
                                className='object-contain h-[160px] mt-[10px]' />
                        }
                    </div>
                    <div className="mt-[10px]">
                    {/* className={`${variant === "own" ? "hidden" : "block"}`} */}

                        <div className={`${variant === "allCars" && "justify-end mb-5 flex-col md:flex-row"} flex flex-row md:justify-between  gap-3`}>
                            <div className='text__medium flex items-center gap-1 '>
                                <FaGasPump />
                                <span>{car?.fuelCapacity}L</span>
                            </div>
                            <div className='text__medium flex items-center gap-1 '>
                                <GiSteeringWheel />
                                <span>{car?.transmission}</span>
                            </div>
                            <div className='text__medium flex items-center gap-1 '>
                            <FaCar/>
                                <span className='whitespace-nowrap'>{car?.engine} </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${variant === "own" ? "hidden" : "block"} flex justify-between mt-2 gap-x3`}>
                    <p className='text-xs'>ETB{" "} {car?.price}
                        <sub className='text__medium  self-end'>/day</sub>
                    </p>
                    <button type="button"
                        onClick={openModal}
                        className="btn__bg py-1 px-3 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-300 focus:bg-purple-200">
                        More Info
                    </button>

                    {/* Car Details Dialog  */}
                    <CarDetailrent
                                car={car}
                                variant={variant}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen} /> 
                </div>
            </section >

        </main>

        
    )
}

export default Rent