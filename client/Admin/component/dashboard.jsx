import CountUp from "react-countup"


function DashBoard(){
    return (
        <>
         <div className='flex  gap-[20px] flex-wrap mt-[10px] ml-[40px]'>
           
                <div className=" w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
                    <img src="https://www.svgrepo.com/show/125995/multiple-users-silhouette.svg" alt="" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold' end={500} />
                        <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >All Users</span>
                    </div>
                </div>

                <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
                    <img src="data:image/png;base64,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" alt="" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold' end={11000} />
                        <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >Organizations</span>
                    </div>
                </div>

                
                <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
                    <img src="data:image/png;base64,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" alt="" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold' end={100900} />
                        <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Mechanics</span>
                    </div>
                </div>

                <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
                    <img src="https://www.svgrepo.com/show/25407/car.svg" alt="" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold bg-slate-600'  end={100900} />
                        <span className="bg-brown-500 text-blue-400 p-1.5 rounded-md text-sm font-bold" >Total cars</span>
                    </div>
                </div>
               
                <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl ">
                    <img src="https://www.svgrepo.com/show/67847/sale-car.svg" alt="car for sell" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold ' end={100900} />
                        <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Car for Sale </span>
                    </div>
                </div>

                <div className="w-[190px] flex flex-col gap-2 shadow-lg rounded-lg  bg-white p-3 md:p-5 max-w-xl">
                    <img src="https://www.svgrepo.com/show/28669/rent-a-car.svg" alt="car for rent" className='h-32 object-contain' />
                    <div className='w-12 h-1 bg-yellow-500' />
                    <div className='flex justify-between items-center'>
                        <CountUp duration={5} className='text-xl font-semibold' end={100900} />
                        <span className="bg-brown-500 text-blue-400  rounded-md text-sm font-bold" >Car for Rent</span>
                    </div>
                </div>
              
               
            </div>
        
        </>
    )
}
export default DashBoard