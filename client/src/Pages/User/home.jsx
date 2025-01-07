import Header from "../User/components/Header/index"
import Hero from "../User/components/Hero/hero"
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