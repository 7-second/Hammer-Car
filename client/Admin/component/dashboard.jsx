import CountUp from "react-countup";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function DashBoard() {
  return (
    <>
      <div className=" h-fit flex  mt-[10px]">
        <div className="hidden md:flex w-[400px] h-fit flex-wrap justify-center pr-3 pb-2 gap-3 shadow-lg">

          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-lg rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2>Users</h2>
              </div>
            </div>
          </div>

          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-lg rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://cdn-icons-png.flaticon.com/512/3985/3985222.png"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2>Organiztions</h2>
              </div>
            </div>
          </div>

          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-2xl rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://cdn-icons-png.freepik.com/512/15894/15894068.png"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2 className="font-semibold">Mechanics</h2>
              </div>
            </div>
          </div>
          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-lg rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://www.svgrepo.com/show/280336/car.svg"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2>Cars</h2>
              </div>
            </div>
          </div>

          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-lg rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://cdn-icons-png.flaticon.com/512/8566/8566110.png"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2>Car for Rent</h2>
              </div>
            </div>
          </div>

          <div className="w-[250px] h-[150px] flex flex-col items-center justify-center shadow-lg rounded-3xl">
            <div className="w-[150px] h-[100px]">
              <img
                className=""
                src="https://cdn-icons-png.flaticon.com/512/6428/6428512.png"
                alt=""
              />
            </div>
            <div className="w-full flex justify-evenly">
              <div className="d">
                <CountUp start={0} end={20000} />
              </div>
              <div className="d">
                <h2>Cars For Sale</h2>
              </div>
            </div>
          </div>
          <div className="mt-[30px] h-fit flex justify-center ml-[20px]">

<div className="w-[330px]  h-[200px] shadow-2xl flex flex-col items-center justify-center " >
    <div className="flex justify-center">

    <h1 className="font-bold text-blue-600">
        Organization Verification
    </h1>
    </div>   

<PieChart 
series={[
{
data: [
{ id: 0, value: 10, label: 'Aprove Request' },
{ id: 1, value: 15, label: 'Aproved' },
{ id: 2, value: 20, label: 'Not Aproved' },
],
},
]}
width={400}
height={200} />

    </div>


</div> 
          

        </div> 
      
      </div>




{/* for smaller screen */}
                  <div className="md:hidden flex flex-row flex-wrap  justify-evenly shadow-2xl shadow-green-400 ">
                  <div className="mt-[30px] h-fit flex justify-center ml-[20px]">

<div className="w-full  h-[200px] shadow-2xl " >
    <div className="flex justify-center">

    <h1 className="font-bold text-blue-600">
        Organization Verification
    </h1>
    </div>
    
     

<PieChart 
series={[
{
data: [
{ id: 0, value: 10, label: 'Aprove Request' },
{ id: 1, value: 15, label: 'Aproved' },
{ id: 2, value: 20, label: 'Not Aproved' },
],
},
]}
width={400}
height={200} />

    </div>


</div>     
             <div className="w-[150px] shadow-2xl rounded-md">
                <img 
                className="w-fit h-[200px]"
                src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" alt="Users" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     All Users</span>
                 </div>
                 </div>

                 <div className="w-[150px] shadow-2xl rounded-md">
                <img 
                className="w-fit h-[200px]"
                src="https://cdn-icons-png.flaticon.com/512/3985/3985222.png" alt="Organizations" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Organizations</span>
                 </div>
                 </div>

                 <div className=" w-[150px] shadow-2xl rounded-md mt-[20px]">
                <img 
                className="w-fit h-[200px]"
                src="https://cdn-icons-png.freepik.com/512/15894/15894068.png" alt="Mechanics" />
                   <div className='flex justify-evenly'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Mechanics</span>
                 </div>
                 </div>

                 <div className="w-[150px] shadow-2xl rounded-md  mt-[20px]">
                <img 
                className="w-fit h-[200px]"
                src="https://www.svgrepo.com/show/280336/car.svg" 
                alt="All cars" />

                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     All Cars</span>
                 </div>
                 </div>

                 <div className="w-[150px] shadow-2xl rounded-md  mt-[20px]">
                <img 
                className="w-fit h-[200px]"
                src="https://cdn-icons-png.flaticon.com/512/8566/8566110.png" alt="Rented Cars" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     cars For Rented</span>
                 </div>
                 </div>

                 <div className="w-[150px] shadow-2xl rounded-md  mt-[20px]">
                <img 
                className="w-fit h-[200px]"
                src="https://cdn-icons-png.flaticon.com/512/6428/6428512.png" alt="sale cars" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Car For Sales</span>
                 </div>
                 
                 </div>
                 

                   



        </div>

   




      {/* for Higher screen */}
      {/* <div className="hidden md:flex flex-wrap w-[400px] gap-[10px]   mt-8 flex-wrap ">
             <div className="w-[200px] shadow-2xl rounded-md bg-pink-500 shadow-yellow-500">
                <img 
                className="w-fit h-[100px]"
                src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" alt="Users" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     All Users</span>
                 </div>
                 </div>

                 <div className="w-[200px] shadow-2xl rounded-md">
                <img 
                className="w-fit h-[100px]"
                src="https://cdn-icons-png.flaticon.com/512/3985/3985222.png" alt="Organizations" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Organizations</span>
                 </div>
                 </div>

                 <div className="w-[200px] shadow-2xl rounded-md mt-[20px]">
                <img 
                className="w-fit h-[100px]"
                src="https://cdn-icons-png.freepik.com/512/15894/15894068.png" alt="Mechanics" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Mechanics</span>
                 </div>
                 </div>

                 <div className="w-[200px] shadow-2xl rounded-md  mt-[20px]">
                <img 
                className="w-fit h-[100px]"
                src="https://www.svgrepo.com/show/280336/car.svg" alt="All cars" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     All Cars</span>
                 </div>
                 </div>

                 <div className="w-[200px] shadow-2xl rounded-md  mt-[20px]">
                <img 
                className="w-fit h-[100px]"
                src="https://cdn-icons-png.flaticon.com/512/8566/8566110.png" alt="Rented Cars" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     cars For Rented</span>
                 </div>
                 </div>

                 <div className="w-[200px] shadow-2xl rounded-md  mt-[20px] bg-green-400">
                <img 
                className="w-fit h-[100px]"
                src="https://cdn-icons-png.flaticon.com/512/6428/6428512.png" alt="sale cars" />
                   <div className='flex justify-evenly items-center'>
                    <CountUp duration={5} className='text-xl font-semibold ml-2' end={500} />
                     <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >
                     Car For Sales</span>
                 </div>
                 </div>
                  </div> */}

      
    </>
  );
}
export default DashBoard;

// <div className='flex  gap-[20px] flex-wrap mt-[10px] justify-evenly'>

// <div className=" w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
//     <img src="https://www.svgrepo.com/show/125995/multiple-users-silhouette.svg" alt="" className='h-32 object-contain' />
//     <div className='w-12 h-1 bg-yellow-500' />
//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold' end={500} />
//         <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >All Users</span>
//     </div>
// </div>

// <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
//     <img src="data:image/png;base64,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" alt="" className='h-32 object-contain' />

//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold' end={11000} />
//         <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >Organizations</span>
//     </div>
// </div>

// <div className="w-[10px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
//     <img src="data:image/png;base64,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" alt="" className='h-32 !w-[100px]' />
//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold' end={100900} />
//         <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Mechanics</span>
//     </div>
// </div>

// <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
//     <img src="https://www.svgrepo.com/show/25407/car.svg" alt="" className='h-32 object-contain' />

//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold bg-slate-600'  end={100900} />
//         <span className="bg-brown-500 text-blue-400 rounded-md text-sm font-bold" >Total cars</span>
//     </div>
// </div>

// <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl ">
//     <img src="https://www.svgrepo.com/show/67847/sale-car.svg" alt="car for sell" className='h-32 w-[100px]' />

//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold ' end={100900} />
//         <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Car for Sale </span>
//     </div>
// </div>

// <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
//     <img src="https://www.svgrepo.com/show/28669/rent-a-car.svg" alt="car for rent" className='h-32 object-contain' />
//     <div className='flex justify-between items-center'>
//         <CountUp duration={5} className='text-xl font-semibold' end={100900} />
//         <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Car for Rent</span>
//     </div>
// </div>

// </div>
