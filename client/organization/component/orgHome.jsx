import Rent from "../../src/components/Car card/rentCard";
import OrgRent from "./rentcard";

function OrgHome() {
  const carTypes = ["LUXURY", "TRUCK", "SEDAN", "CONVERTIBLE", "SPORTS", "WAGONS"];

  return (
    <>
    <div className="bg-gray-50">
      {/* Header */}
      {/* <header className="bg-yellow-400 p-4 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-gray-800">HARRIER</h1>
          <nav className="flex space-x-6 text-gray-700">
            <a href="#" className="hover:text-black">Home</a>
            <a href="#" className="hover:text-black">Listing</a>
            <a href="#" className="hover:text-black">Compare</a>
            <a href="#" className="hover:text-black">Contact</a>
          </nav>
          <button className="bg-gray-800 text-white px-4 py-2 rounded">Login</button>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative  ">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjthIyeHvmjXTv-c-fgLwC77CpJtXoCnIL2I6btSJhkLiIhwjWxmKkpGCGNF76qJtSpeovxD64Vk2chdjBOgK1Wneq0lhAEB6DxB5YjHsa5aGQOoQfm4ygQ0cNTEh9t1SWrrzRoL2Ul-xCR/s1600-rw/CAR-WALLPAPER-1920x1080.jpg"
          alt="Yellow Car"
          className="w-full h-52 object-cover opacity-70 relative"
        />
        <div className="d">
          <h1 className="text-yellow-500 absolute mt-[200px]">your organization</h1>
        </div>
       
      </section>

      {/* Main Content */}
      <div className="flex justify-center px-8 mt-8">
       
        {/* Car Types Section */}
        <div className="flex flex-wrap justify-around bg-yellow-700 p-6 rounded-lg w-2/3">
          {carTypes.map((type, index) => (
            <div key={index} className="text-center m-2">
              <img
                src="https://via.placeholder.com/100x50"
                alt={type}
                className="mx-auto mb-2"
              />
              <p className="font-bold text-gray-700">{type}</p>
            </div>
          ))}
          </div>
      </div>

      {/* Featured Offers Section */}
      <section className="flex justify-between px-8 py-6 mt-8 bg-white">
        <div className="w-1/2 p-4 bg-gray-100 rounded">
          <h3 className="font-bold text-lg mb-2">Limited Offer</h3>
          <p>At amazing discounts.</p>
        </div>
        <div className="w-1/2 p-4 bg-gray-100 rounded ml-4">
          <h3 className="font-bold text-lg mb-2">Smart Interior: Sports Car</h3>
          <p>Stylish interiors for your dream car.</p>
        </div>
      </section>
    </div>
    <hr className="mt-2" />
    <h1 className="flex items-center justify-center pb-4 text-3xl font-serif font-bold text-blue-500">Our Feature Cars For Rent</h1>
    <div className="w-full flex flex-wrap gap-6 !mr-16">

  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
  <OrgRent />
    </div>
    </>
  );
}

export default OrgHome;
