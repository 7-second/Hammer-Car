
import axios from "axios"
import { BiLogOut } from "react-icons/bi"
import { GoHomeFill } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom";
import Drawer1 from "../Drawer/Drawer"



function Header() {
    const navigate = useNavigate()

    // Get user
    let currentUser
    const user = localStorage.getItem("users_data")
    if (user) {
        currentUser = JSON.parse(user)
    }
    // console.log(currentUser, "user")

    const handleLogout = () => {
        localStorage.clear("users_data")
        navigate("/")
    }

    return (
        <>

            {/* Mobile */}
            <header className='flex flex-col md:hidden p-5 gap-1 bg-white  justify-between sticky z-50 top-0 shadow-lg'>


                <div className="flex items-center justify-between">
                    <Drawer1 />
                    <div>

                        {!currentUser
                            ? <Link to={"/signIn"} className="btn__bg py-1 px-3 text-xs rounded-md"
                            >
                                Sign-in
                            </Link>
                            : (
                                <div className="flex gap-3 items-center">

                                    <div className="flex justify-center">
                                        <h1 className="text-black">
                                            <Link to={"/profile"}>
                                                {currentUser.username}

                                            </Link>

                                        </h1>

                                    </div>
                                    {
                                        currentUser?.profilePicture &&
                                        //@ts-ignore
                                        <Link to={`/profile`}>
                                            <img
                                                src={`${currentUser?.profilePicture}`}
                                                alt="Profile"
                                                width={20}
                                                height={20}
                                                className="!w-8 !h-8 rounded-full object-cover" />
                                        </Link>

                                    }
                                    <div onClick={handleLogout}>
                                        <BiLogOut
                                            className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                                    </div>


                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="flex justify-center w-full">

                    <div className="mt-[10px]">
                        <ul className="flex flex-row gap-[20px]">
                            <button className="text-blue-400 flex font-bold text-sm md:text-base"><Link to="/"> Home</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/View-all-rent">Rent</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/View-all-sell">Sell</Link></button>
                            <button className="font-bold text-sm md:text-base"><Link to="/organization">Organization</Link></button>

                        </ul>
                    </div>

                </div>



            </header >



            {/* Large Screen */}
            <header className='hidden md:flex flex-col p-5 gap-1 bg-white  justify-between sticky z-50 top-0 shadow-lg'>


                <div className="flex items-center justify-between">
                    <Drawer1 />

                    <div className="flex justify-center w-full">

                        <div className="mt-[10px]">
                            <ul className="flex flex-row gap-[20px]">
                                <button className="text-blue-400 flex font-bold text-sm md:text-base"><Link to="/"> Home</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/View-all-rent">Rent</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/View-all-sell">Sell</Link></button>
                                <button className="font-bold text-sm md:text-base"><Link to="/organization">Organization</Link></button>

                            </ul>
                        </div>

                    </div>

                    <div>

                        {!currentUser
                            ? <Link to={"/signIn"} className="btn__bg py-1 px-3 text-xs rounded-md"
                            >
                                Sign-in
                            </Link>
                            : (
                                <div className="flex gap-3 items-center">

                                    <div className="flex justify-center">
                                        <h1 className="text-black">
                                            <Link to={"/profile"}>
                                                {currentUser.username}

                                            </Link>

                                        </h1>

                                    </div>
                                    {
                                        currentUser?.profilePicture &&
                                        //@ts-ignore
                                        <Link to={`/profile`}>
                                            <img
                                                src={`${currentUser?.profilePicture}`}
                                                alt="Profile"
                                                width={20}
                                                height={20}
                                                className="!w-8 !h-8 rounded-full object-cover" />
                                        </Link>

                                    }
                                    <div onClick={handleLogout}>
                                        <BiLogOut onClick={() => { }}
                                            className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                                    </div>


                                </div>
                            )
                        }
                    </div>
                </div>





            </header >
        </>
    )
}

export default Header