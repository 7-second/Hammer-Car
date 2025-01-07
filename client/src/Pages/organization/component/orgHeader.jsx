import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import logo from "../../../../public/logo.png";

const OrgHeader = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("users_data");
    navigate("/");
  };

  return (
    <>
      {/* Mobile */}
      <header className="flex flex-col md:hidden p-5 gap-1 bg-white justify-between sticky z-5 top-0 shadow-lg">
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-center w-full">
            <div className="mt-[10px]">
              <ul className="flex flex-row gap-[20px]">
                <Link to="/orghome" className="text-xl font-bold text-blue-500">
                  <img
                    width={150}
                    height={50}
                    src={logo}
                    alt="Logo"
                    className="mt-0 absolute mr-[90px] "
                  />
                </Link>
                <li>
                  <Link
                    to="/orghome"
                    className="font-bold text-sm md:text-base"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/orgprofile"
                    className="font-bold text-sm md:text-base"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rental-list"
                    className="font-bold text-sm md:text-base"
                  >
                    Rental
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sale-list"
                    className="font-bold text-sm md:text-base"
                  >
                    Sale
                  </Link>
                </li>
                <li>
                  <Link to="/addcar" className="font-bold text-sm md:text-base">
                    Add Cars
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <div className="flex justify-center">
                <h1 className="text-black">{currentUser?.username}</h1>
              </div>
              {currentUser?.profilePicture && (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div onClick={handleLogout}>
                <BiLogOut className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Large Screen */}
      <header className="hidden md:flex flex-col p-5 gap-1 bg-white justify-between sticky top-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex justify-center w-full">
            <div className="mt-[10px]">
              <ul className="flex flex-row gap-[20px]">
                <li>
                  <Link
                    to="/orghome"
                    className="font-bold text-sm md:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orgprofile"
                    className="font-bold text-sm md:text-base"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/rental-list"
                    className="font-bold text-sm md:text-base"
                  >
                    Rental List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sale-list"
                    className="font-bold text-sm md:text-base"
                  >
                    Sale List
                  </Link>
                </li>
                <li>
                  <Link to="/addcar" className="font-bold text-sm md:text-base">
                    Add Cars
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <div className="flex justify-center">
                <h1 className="text-black">
                  <Link to="/profile">{currentUser?.username}</Link>
                </h1>
              </div>
              {currentUser?.profilePicture && (
                <Link to="/profile">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              )}
              <div onClick={handleLogout}>
                <BiLogOut className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default OrgHeader;
