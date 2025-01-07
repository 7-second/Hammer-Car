import { CiSearch } from "react-icons/ci"
import Header from "../User/components/Header/index"
import Hero from "../User/components/Hero/hero"
import Rentedcars from "./rentingcar"
import Sell from "./sellingcar"
import { Link } from "react-router-dom"


function Home() {
  return <>
    <Header />

    <div className="mt-[20px]">
      <Hero />
    </div>

    <div className="mt-[20px]">
      <hr />
    </div>

    <div className="md:hidden absolute -mt-10 rounded-lg flex justify-center items-center  m-16 h-7 w-2/3 bg-blue-500">
                  <Link to="/search" >
                    <h2 className="flex justify-center items-center text-white">Search  <CiSearch /></h2>
                  </Link>
                  
    </div>

    <div className="p-5 shadow-lg px-16 ">
      <Rentedcars />
    </div>

    <div className="mt-[10x]">
      <hr />
    </div>

    <div className="py-5">
      <Sell />
    </div>






  </>

}
export default Home