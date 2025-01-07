import React from 'react';
import { FaInstagram, FaTelegram } from 'react-icons/fa';


const MechDetail = () => {
    return (
        <>
        <div className="w-full items-center flex justify-center ">
         <div className="relative rounded-lg w-3/4  ">
            <img src="https://www.checkatrade.com/blog/wp-content/uploads/2021/07/Feature-mechanic-hourly-rate-uk.jpg"
             alt="" 
             className='w-full px-10 h-  opacity-80 md:h-80'
             />
             </div>

             <div className="absolute mt-44 md:mt-80 w-2/4 h-fit  shdow-lg flex justify-evenly items-center bg-slate-100 shodow-2xl shadow-green-300 rounded-sm">

             <div className=" items-center flex flex-col">
                <h2 className='pb-2 font-sans font-bold'>Branches</h2>
                <ul>
                    <li>Lafto</li>
                    <li>Megenagna</li>
                    <li>Saris</li>
                    <li>Jemo</li>
                </ul>
             </div>

             <div className=" items-center flex flex-col">
                <h2 className='pb-2 font-sans font-bold'>Opening Day</h2>
                <ul>
                    <li>Monday</li>
                    <li>Tusday</li>
                    <li>Friday</li>
                    <li>Monday</li>
                </ul>
             </div>


             <div className=" items-center flex flex-col ">
                <h2 className='pb-2 font-sans font-bold '>Contact Us</h2>
                <ul>
                    <li>985434363</li>
                    <li>Exampel@gmail.com</li>
                    <li className='flex flex-row items-center gap-1'><FaTelegram />@Mechanic</li>
                    <li  className='flex flex-row items-center gap-1'><FaInstagram/>@mechanic</li>
                    
                </ul>
             </div>

             </div>
           
           {/* <div className="z-10 rounded-md shadow-md bg-white flex flex-col justify-center items-center gap-3 absolute z-100 -mt-[200px] ml-[900px] px-16 py-8">
            <h1 className='font-sans font-bold'>Request a CallBack</h1>
            <input type="text" name="" id=""placeholder='Name' 
            className='bg-slate-100 w-60 text-black h-10 rounded-sm pl-2 outline-none'
            />
            <input type="text" name="" id=""placeholder='Phone' 
            className='bg-slate-100 w-60 text-black h-10 rounded-sm pl-2 outline-none'
            />
            <input type="text" name="" id=""placeholder='example@gmail.com' 
            className='bg-slate-100 w-60 text-black h-10 rounded-sm pl-2 outline-none'
            />

            <button className='bg-blue-600 hover:bg-purple-600 rounded-sm px-10 text-white font-serif'>Send Request</button>
           
           </div> */}

        </div>
        
        {/* <div className="w-full h-16 items-center flex justify-center mt-2 ">
            <div className="w-2/4 bg-blue-300 h-full relative flex justify-center items-center rounded-xl">
            <h2 className=' absolute'>Service We offer</h2>
            </div>
            

        </div> */}

        <div className="flex flex-col justify-center items-center relative mt-24 ">
            <div className="">
                <h1 className='text-black text-lg'>Vehichle Repair Services</h1>
               
            </div>

            <div className="flex flex-row gap-16 mt-4 ">

            <div className="flex flex-col ">
            <div className="flex items-center justify-center w-32 h-32 rounded-full shadow-sm border-solid border-2 border-blue-500">
                
                  <h3>Air filter</h3>
            </div>
            <div className="mt-16 flex items-center justify-center w-32 h-32 rounded-full shadow-sm border-solid border-2 border-blue-500">
                 
                  <h3>Air filter</h3>
            </div>
            </div>

            <div className="flex flex-col ">
            <div className=" flex items-center justify-center w-32 h-32 rounded-full shadow-sm border-solid border-2 border-blue-500">
                  
                  <h3>Engin Repair</h3>
            </div>
            <div className="mt-16 flex items-center justify-center w-32 h-32 rounded-full shadow-sm border-solid border-2 border-blue-500">
                 <h3>Air filter</h3>
            </div>
            </div>

            </div>
        </div>
        
             </>
    );
};

export default MechDetail;