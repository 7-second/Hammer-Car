
import axios from "axios"
import { BiLogOut } from "react-icons/bi"
import { GoHomeFill } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";



function AdminHeader() {
    const navigate = useNavigate()

    // Get user
    let currentUser
    const admin = localStorage.getItem("admin_data")
    if (admin) {
        currentUser = JSON.parse(admin)
    }
    // console.log(currentUser, "user")

    const handleLogout = () => {
        localStorage.clear("users_data")
        navigate("/")
    }

    return (
        <>

            {/* Mobile */}
            <header className='flex flex-col md:hidden p-5 gap-1 bg-white  justify-between sticky z-50 top-0 shadow-lg mx-10 rounded-xl '>


                <div className="flex items-center justify-between gap-11">
                <div className="h-fit  flex top-0 -mb-2 pb-4 ">
                
                <span className='text-orange-500 font-serif font-bold '>Hammer</span><FaCarSide /> <h2  className='text-blue-500 font-serif font-bold '>Cars</h2> 
                </div>
              
                    <div>

                       
                                <div className="flex gap-3 justify-end">

                                    <div className="flex justify-center">
                                        <h1 className="text-black">
                                                {currentUser.username}
                                        </h1>

                                    </div>
                                    {
                                        //@ts-ignore
                                            <img
                                                src={`${currentUser?.profilePicture}`}
                                                alt="Profile"
                                                width={20}
                                                height={20}
                                                className="!w-8 !h-8 rounded-full object-cover" />

                                    }
                                    <div onClick={handleLogout}>
                                        <BiLogOut
                                            className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                                    </div>


                                </div>
                            
                    </div>
                </div>

                <div className="flex justify-center w-full">

                    <div className="mt-[10px]">
                        <ul className="flex flex-row gap-[20px]">
                            <button className="text-blue-400 flex font-bold text-sm md:text-base"><Link to="/adminhome"> Dash Board</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/adminform">Add Users</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/mechanics">Mechanics</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/organization">Organization</Link></button>

                        </ul>
                    </div>

                </div>



            </header >



            {/* Large Screen */}
            <header className='hidden md:flex flex-col p-5 gap-1 bg-white rounded-3xl  justify-between sticky z-50 top-2 shadow-lg mx-[20px]'>

                <div className="h-fit  flex top-0 -mb-6 -mt-4 pb-4">
                    <span className='text-orange-500 font-serif font-bold '>Hammer</span><FaCarSide /> <h2  className='text-blue-500 font-serif font-bold '>Cars</h2> 
                </div>
                <div className="flex items-center justify-evenly">
                    <div className="flex justify-center w-full">

                        <div className="mt-[10px]">
                            <ul className="flex flex-row gap-[20px]">
                                <button className="text-blue-400 flex  text-sm md:text-base"><Link to="/adminhome"> Dash Board</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/adimnform">Add Users</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/mechanics">Mechanics</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/organization">Organization</Link></button>

                            </ul>
                        </div>

                    </div>

                    <div>
                                  
                                <div className="flex gap-3 items-center">

                                    <div className="flex justify-center">
                                        <h1 className="text-black">
                                                {currentUser.username}
                                        </h1>

                                    </div>
                                    {
                                        currentUser?.profilePicture &&
                                        //@ts-ignore
                                            <img
                                                src={`${currentUser?.profilePicture}`}
                                                alt="Profile"
                                                width={80}
                                                height={70}
                                                className="!w-16 !h-10 rounded-full object-cover" />

                                    }
                                    <div onClick={handleLogout}>
                                        <BiLogOut onClick={() => { }}
                                            className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                                    </div>


                                </div>
                            
                    </div>
                </div>





            </header >
        </>
    )
}

export default AdminHeader