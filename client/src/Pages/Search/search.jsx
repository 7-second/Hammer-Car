import Header from "../../components/Header/header"
import Card from "../../components/Car card/card"

function Search(){
    return<>
      <Header className="sticky t-0" />
    <div className="h-full  mt-[20px] bg-gray-100 shadow-2xl flex relative pb-[50px] ">
 
    <aside className="bg-white p-4 shadow w-[300px]">
      <h2 className="text-lg font-bold mb-4">Search functionality Coming Soon!</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Type</h3>
        <div className=" w-[200px] flex flex-col">
          <label><input type="checkbox" /> Sport</label>
          <label><input type="checkbox" /> SUV</label>
          <label><input type="checkbox" /> MPV</label>
          <label><input type="checkbox" /> Sedan</label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Capacity</h3>
        <div className="flex flex-col">
          <label><input type="checkbox" /> 2 Person</label>
          <label><input type="checkbox" /> 4 Person</label>
          <label><input type="checkbox" /> 6 Person</label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Price</h3>
        <input type="range" min="0" max="100" className="w-full" />
        <p>Max $100.00</p>
      </div>
    </aside>

        <div className="p-4 flex flex-wrap ml-[50px]  md:grid-cols-3 gap-6 ">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>


    </div>
    
    </>
}
export default Search