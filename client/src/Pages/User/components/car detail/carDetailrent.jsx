import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ArrayStar = ({ rating }) => {

  const CarDetailsModal = ({
    isOpen,
    closeModal,
    car,
    currentUser,
    isRentOpen,
    setIsRentOpen,
    openRentModal,
  }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (car?.images?.length || 1) - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? (car?.images?.length || 1) - 1 : prevIndex - 1
      );
    }
  }
  
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const RentModal = ({ isRentOpen, setIsRentOpen, carId }) => {
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");


  const buyNowHandler = async () => {
    console.log("click");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}rent//rented-car`, {
        from,
        to
      });
      toast.success("rent Car SuccessFully");

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRentSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the rent request
    toast.success("Rental request submitted successfully!");
    setIsRentOpen(false);
  };

  return (
    <Transition appear show={isRentOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => setIsRentOpen(false)}>
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                <h3 className="text-lg font-semibold text-center">Rent a Car</h3>
                <form onSubmit={handleRentSubmit} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="rentDate" className="block text-sm font-medium">Rent Start Date</label>
                    <input
                      type="date"
                      id="rentDate"
                      name="rentDate"
                      value={rentDate}
                      onChange={(e) => setRentDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="returnDate" className="block text-sm font-medium">Return Date</label>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                      onClick={buyNowHandler}
                    >
                      Rent Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRentOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const CarDetailrent = ({ car, isOpen, setIsOpen }) => {
  const [isRentOpen, setIsRentOpen] = useState(false);
  let currentUser;
  const user = localStorage.getItem("users_data");
  if (user) {
    currentUser = JSON.parse(user);
  }

  const openRentModal = () => {
    setIsRentOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
 
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Modal Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-lg p-6 text-left align-middle transition-all">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1.5 font-bold hover:bg-red-600 focus:outline-none"
                >
                  X
                </button>

                {/* Car Details Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Images Section */}
                  <div className="flex flex-wrap gap-2">
                    {car?.images?.slice(0, 5).map((image, index) => (
                      <img
                        key={index}
                        src={image?.url || "cover.jpg"}
                        alt={`Car Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {car?.carModel}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {car?.year} | {car?.carType} | {car?.carBrand}
                    </p>
                    <div className="flex items-center text-sm gap-2">
                      <ArrayStar rating={Math.floor(Math.random() * 5) + 1} />
                      <span>
                        {Math.floor(Math.random() * 1000) + 50} Reviews
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {car?.description || "No description available."}
                    </p>
                  </div>
                </div>

                {/* Specifications */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Owner:</span>{" "}
                      {car?.owner?.username || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Engine:</span>{" "}
                      {car?.engine || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">CC:</span>{" "}
                      {car?.CC || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Fuel Capacity:</span>{" "}
                      {car?.fuelCapacity} L
                    </p>
                    <p>
                      <span className="font-semibold">Transmission:</span>{" "}
                      {car?.transmission || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">People Capacity:</span>{" "}
                      {car?.peopleCapacity || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {car?.location || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> ETB{" "}
                      {car?.price || "N/A"} /day
                    </p>
                  </div>
                </div>

                {/* Rent Button */}
                <div className="mt-6 flex justify-center">
                  {!currentUser ? (
                    <Link to="/signin">
                      <button className="bg-yellow-500 text-white py-2 px-6 rounded-md text-sm hover:bg-yellow-600">
                        Rent Now
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white py-2 px-6 rounded-md text-sm hover:bg-yellow-600"
                      onClick={openRentModal}
                    >
                      Rent Now
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>

      {/* Rent Modal */}
      <RentModal
        isRentOpen={isRentOpen}
        setIsRentOpen={setIsRentOpen}
        carId={car?._id}
      />
    </Transition>



    </>
  );
};

export default CarDetailrent;
