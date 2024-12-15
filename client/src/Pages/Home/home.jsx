
import Header from "../../components/Header"
import Hero from "../Home/hero"
import Rentedcars from "./rentingcar"
import Sell from "./sellingcar"


function Home() {
  return <>
    <Header />

    <div className="mt-[20px]">
      <Hero />
    </div>

    <div className="mt-[20px]">
      <hr />
    </div>

    <div className="p-5 shadow-lg ">
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