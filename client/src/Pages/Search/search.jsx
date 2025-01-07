import { CiSearch } from "react-icons/ci";
import Filter from "./filer";

function Search() {
  return (
    <>
      {/* for larger screen */}
      <div className="hidden  md:flex w-full flex-row gap-5">
        <div className="h-[calc(100%-50px)] -mt-6 pb-44 w-1/5 flex flex-col gap-3 pl-6 shadow-2xl p-4  rounded-md bg-white">
          <h3 className="flex itmes-center font-sans font-bold uppercase bg-orange-400 rounded-lg justify-center">Filter</h3>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <p className="text__medium my-2 text-blue-500">Type</p>
            <Filter type={"Sale"} />
            <Filter type={"Rent"} />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <p className="text__medium my-2 text-blue-500">Brand</p>
            <Filter type={"2 Person"} />
            <Filter type={"4 Person"} />
            <Filter type={"6 Person"} />
            <Filter type={"8 or More"} />
          </div>
        </div>

        <div className="w-full h-fit flex flex-row justify-center items-center  ">
          <div className="flex justify-center items-center h-12 w-1/4 bg-blue-500 rounded-md ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              className="h-7 rounded-sm w-56 px-3 outline-none cursor-pointer"
            />
          </div>
          <div className="items-center ">
            <CiSearch className="items-center flex justify-center text-2xl" />
          </div>
          <div className="flex justify-center items-center h-12 w-1/4 bg-purple-500 rounded-lg"></div>
        </div>
      </div>


      {/* for mobile screen */}
      <div className="md:hidden w-full flex flex-row gap-2">

        <div className=" sticky h-fit pb-96 -mt-6  w-2/3 flex flex-col gap-3 pl-2 shadow-2xl p-4  rounded-md bg-white">
          <h3 className="flex itmes-center justify-start uppercase">Filter</h3>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <p className="text-sm  my-2">Type</p>
            <Filter type={"Sale"} />
            <Filter type={"Rent"} />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-1">
            <p className="text-sm my-2">Brand</p>
            <Filter type={"2 Person"} />
            <Filter type={"4 Person"} />
            <Filter type={"6 Person"} />
            <Filter type={"8 or More"} />
          </div>
        </div>

        <div className="w-full h-fit flex flex-row justify-center items-center  ">
          <div className="flex justify-center items-center h-12 relative rounded-md ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              className="h-7 absolute -mt-20 bg-slate-100 rounded-sm w-46 px-3 outline-none cursor-pointer"
            />
          </div>
          <div className="w-fit items-center absolute ml-48 ">
            {/* <CiSearch className=" items-center flex justify-center text-2xl" /> */}
          </div>
          <div className="hidden  justify-center items-center h-12 w-1/4 bg-purple-500 rounded-lg"></div>
        </div>
      </div>
    </>
  );
}
export default Search;
