import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import DDrawer from "../Drawer/Drawer";
import { ThemeContext } from '../../../../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';


function Header() {
  const navigate = useNavigate();
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  

  // Get user
  let currentUser;
  const user = localStorage.getItem("users_data");
  if (user) {
    currentUser = JSON.parse(user);
  }
  // console.log(currentUser, "user")

  const handleLogout = () => {
    localStorage.clear("users_data");
    navigate("/");
  };

  return (
    <>
      {/* Mobile */}
      <header className=" md:hidden flex flex-col w-full gap-1 bg-white  justify-between sticky z-50 top-0 shadow-lg shadow-blue-500">
        <div className="flex items-center justify-between gap-2">
          <div className="h-fit  flex top-0 -mb-2 pb-4 ">
          <DDrawer />
            <span className="text-orange-500 font-serif font-bold ">
              Hammer
            </span>
            <FaCarSide />{" "}
            <h2 className="text-blue-500 font-serif font-bold ">Cars</h2>
          </div>
          

          <div>
            {!currentUser ? (
              <Link
                to={"/signIn"}
                className=" text-white bg-blue-400 font-serif   px-2 py-1 rounded-md"
              >
                LogIn
              </Link>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="flex justify-center">
                  <h1 className="text-black">
                    <Link to={"/profile"}>{currentUser.username}</Link>
                  </h1>
                </div>
                {currentUser?.profilePicture && (
                  //@ts-ignore
                  <Link to={`/profile`}>
                    <img
                      src={`${currentUser?.profilePicture}`}
                      alt="Profile"
                      width={20}
                      height={20}
                      className="!w-8 !h-8 rounded-full object-cover"
                    />
                  </Link>
                )}
                <div onClick={handleLogout}>
                  <BiLogOut className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div className="mt-[10px]">
            <ul className="flex flex-row gap-[20px]">
              <li className="text-blue-400 flex font-bold text-sm md:text-base underline-effect">
                <Link to="/">Home</Link>
              </li>
              <li className="font-bold text-sm md:text-base underline-effect">
                <Link to="/View-all-rent">Rent</Link>
              </li>
              <li className="font-bold text-sm md:text-base underline-effect">
                <Link to="/View-all-sell">Sell</Link>
              </li>
              <li className="font-bold text-sm md:text-base underline-effect">
                <Link to="/allorganization">Organization</Link>
              </li>
              <li className="font-bold text-sm md:text-base underline-effect">
                <Link to="/allmechanic">Mechanics</Link>
              </li>

            </ul>
          </div>
        </div>
      </header>

      {/* Large Screen */}
   
      <header className="hidden md:flex flex-col pb-2 px-4 gap-1 bg-white  w-full  sticky z-50 top-0 shadow-md shadow-blue-200">
      {/* <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} > */}
      {/* <button onClick={toggleTheme} className="focus:outline-none">
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button> */}
        <div className="flex items-center justify-around ">
          <div className="d">
            <DDrawer />
          </div>
          <div className="h-fit  flex top-0 -mb-8 -mt-4 pb-4">
            <span className="text-orange-500 font-serif font-bold text-sm ">
              Hammer
            </span>
            <FaCarSide />{" "}
            <h2 className="text-blue-500 font-serif font-bold text-sm">Cars</h2>
          </div>
          <div className="flex items-center justify-evenly"></div>

          <div className="flex justify-center w-full">
            <div className="mt-[10px]">
              <ul className="flex flex-row gap-[20px]">
                <li className="text-blue-400 flex font-bold text-sm md:text-base underline-effect hover:underline">
                  <Link to="/">Home</Link>
                </li>
                <li className="font-bold text-sm md:text-base hover:underline  ">
                  <Link to="/View-all-rent">Rent</Link>
                </li>
                <li className="font-bold text-sm md:text-base hover:underline ">
                  <Link to="/View-all-sell">Sell</Link>
                </li>
                <li className="font-bold text-sm md:text-base hover:underline ">
                  <Link to="/allorganization">Organization</Link>
                </li>
                <li className="font-bold text-sm md:text-base hover:underline ">
                  <Link to="/allmechanic">Mechanics</Link>
                </li>

                <li className="font-bold text-sm md:text-base hover:underline ">
                  <Link to="/search">Search</Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            {!currentUser ? (
              <Link
                to={"/signIn"}
                className=" text-white bg-blue-400 font-serif  rounded-md px-3 py-1 "
              >
                LogIn
              </Link>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="flex justify-center">
                  <h1 className="text-black">
                    <Link to={"/profile"}>{currentUser.username}</Link>
                  </h1>
                </div>
                {currentUser?.profilePicture && (
                  //@ts-ignore
                  <Link to={`/profile`}>
                    <img
                      src={`${currentUser?.profilePicture}`}
                      alt="Profile"
                      width={80}
                      height={70}
                      className="!w-16 !h-10 rounded-full object-cover"
                    />
                  </Link>
                )}
                <div onClick={handleLogout}>
                  <BiLogOut
                    onClick={() => {}}
                    className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
      </header>
    </>
  );
}

export default Header;
