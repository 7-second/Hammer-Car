import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Button, Drawer, IconButton, Typography } from "@mui/material";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";


function DDrawer() {

  const navigate = useNavigate()

  // Get user
  let currentUser
  const user = localStorage.getItem("users_data")
  if (user) {
    currentUser = JSON.parse(user)
  }
  // console.log(currentUser, "user")


  const [openLeft, setOpenLeft] = useState(false);
  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);

  const handleLogout = () => {
    navigate("/")
    localStorage.clear("users_data")
  }

  return <>
    <div className="flex  justify-between items-start w-fit">
      <div className="flex items-center">
        <Button onClick={openDrawerLeft} className=" !bg-blue-200 rounded "><RxHamburgerMenu /></Button>
        <Drawer
          placement="left"
          open={openLeft}
          onClose={closeDrawerLeft}
          className="p-4"
        >
          <div className="mb-6 flex  justify-between">
            <Typography variant="h5">
              <div className='font-bold text-xl text-blue-500 whitespace-nowrap ml-[10px] pr-[100px]'>
                <span className='text-orange-500 '>Hammer</span>
                Car
              </div>
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="flex justify-Start ">
            {!currentUser
              ? <Link to={"/signIn"} className="btn__bg py-1 px-3 text-xs text-white rounded-md">
                <Typography color="gray" className="mb-8 pr-4 font-normal mr-[20px]">
                  <div className=" font-normal ml-[50px] mt-[10px]">
                    <Button variant="contained">Login</Button>
                  </div>
                </Typography>
              </Link>
              : (
                <div className="flex flex-row gap-3 items-center">

                  {
                    currentUser?.profilePicture &&
                    //@ts-ignore
                    <Link to={`/profile`}>
                      <img
                        src={`${currentUser?.profilePicture}`}
                        alt="Profile"
                        width={20}
                        height={20}
                        className="!w-[70px] !h-[67px] ml-[70px] rounded-full object-cover" />
                    </Link>
                  }
                </div>
              ) }
          </div>
          <div className="flex justify-center mr-[50px]">
            <h1 className="text-black">
              <Link to={"/profile"}>
                {currentUser?.username}

              </Link>

            </h1>

          </div>


          <hr className="mt-[30px] mx-[20px] bg-blue-500" />
<div className="flex flex-col justify-center">

          <div className="flex flex-col gap-1 mt-[30px] ml-[40px] items-start">
            <Button >
              <Link to={"/organization"}>Organization</Link>

            </Button>
            <Button >Mechanics</Button>
          </div>
          <hr className="mt-[30px] mx-[20px] bg-blue-500" />
          <h3 className="text-orange-500 ml-[40px]">Contact Hammer's</h3>
          
          <Typography >
            <div className="flex flex-col items-start ml-[50px] mt-[10px]">

            <div className="flex flex-row items-center">
            <label htmlFor="">  <FaTelegram />   </label> 
            <Button ><a href="https://t.me/+251943094426">Abdulaziz</a> </Button>
            </div>

            <div className="flex flex-row items-center">
            <label htmlFor="">  <FaInstagram/>   </label> 
            <Button ><a href="https://www.instagram.com/itzcute_hanuni?igsh=dzVjMWhvcGxxcmg1">Hanan</a> </Button>
            </div>

            
            <div className="flex flex-row items-center">
            <label htmlFor="">  <FaFacebook/>   </label> 
            <Button ><a href="https://www.facebook.com/biniyam.gossa.5">Biniyam</a> </Button>
            </div>

            <div className="flex flex-row items-center">
            <label htmlFor="">  <BsFillTelephoneForwardFill/>   </label> 
            <Button ><a href="tel:+251985434363">Bruk</a> </Button>
            </div>
            </div>
            
            </Typography>
          {currentUser &&
            <div className="m-[20px]">
              <div onClick={handleLogout}
                className=" flex w-full justify-center text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md">
                <BiLogOut />
              </div>
            </div>
          }
</div>

         
          
        </Drawer>

      </div>
      

    </div>

  </>
}
export default DDrawer