



function Or() {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-600">CarZone</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Buy a Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Rent a Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUagBM39ePp8AWlkHpe0LwwSM12md6OkXNuw&s') ",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10 text-white">
          <h2 className="text-5xl font-bold mb-4">Find Your Dream Car</h2>
          <p className="text-lg mb-6">Buy or rent the perfect car for any journey.</p>
          <a
            href="#cars"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-full"
          >
            Explore Cars
          </a>
        </div>
      </header>

      {/* Cars Section */}
      <section id="cars" className="py-12 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Our Featured Cars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Car Card 1 */}
            <CarCard
              title="Luxury Sports Car"
              price="$90,000"
              rent="$500/day"
              image="https://png.pngtree.com/background/20230823/original/pngtree-sleek-white-hybrid-coupe-sports-car-concept-on-white-background-3d-picture-image_4792860.jpg"
            />
            {/* Car Card 2 */}
            <CarCard
              title="Comfortable Sedan"
              price="$40,000"
              rent="$200/day"
              image="https://www.hdwallpapers.in/download/adro_ford_mustang_coupe_car_white_background_4k_hd_cars-HD.jpg"
            />
            {/* Car Card 3 */}
            <CarCard
              title="Family SUV"
              price="$50,000"
              rent="$250/day"
              image="https://media.cdn-jaguarlandrover.com/api/v2/images/55880/w/680.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CarCard({ title, price, rent, image }) {
  return (
    <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden">


<img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600">
          Price: {price} | Rent: {rent}
        </p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Or;



