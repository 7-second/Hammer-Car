
import Header from "../../components/Header"
import Hero from "../Home/hero"
import Rentedcars from "./rentingcar"
import Sell from "./sellingcar"


function Home() {
  return <>
  

    <div className="mt-[20px]">
      <Hero />
    </div>

    <div className="mt-[20px]">
    <hr  />
    </div>

    <div className="mt-[5px] shadow-lg ">
      <Rentedcars />
    </div>

    <div className="mt-[10x]">
    <hr  />
    </div>

    <div className="mt-[10px]">
    <Sell />
    </div>
    





  </>

}
export default Home