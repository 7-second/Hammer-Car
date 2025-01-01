
import React, { useEffect, useState } from 'react'

// import Link from 'next/link'
import { BiLoader } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rent from './components/Car card/rentCard';
// import { Cars } from '@/helper';


const Rentedcars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getcar = async () => {
            try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}rent`)
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Rent from '../../components/Car card/rentCard';

// const Rentedcars = () => {
//     const [cars, setCars] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const getcar = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}car/rent`);
//                 setCars(response?.data);
//             } catch (error) {
//                 console.log(error);
//                 setError(error);
//             } finally {
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, 5000); // 5 seconds loading time
//             }
//         };

//         getcar();
//     }, []);

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>Error loading cars: {error.message}</p>
//             ) : (
//                 <div>
//                     <div className='flex flex-col gap-1 pb-[10px]'>
//                         <div className='flex justify-between'>
//                             <h2 className='text-sm font-medium'>Renting Cars</h2>
//                             <Link to={'/View-all-rent'} className='underline'> View All</Link>
//                         </div>
//                         <div className='gap-4 flex overflow-x-auto w-full mb-1'>
//                             {cars.length > 0 ? (
//                                 cars.map((car) => (
//                                     <Rent key={car._id} car={car} />
//                                 ))
//                             ) : (
//                                 <p>No cars available for rent</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Rentedcars;