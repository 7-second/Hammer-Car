
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";



const ArrayStar = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
};

const CarDetails = ({ car, variant, isOpen, setIsOpen }) => {
  const [isRentOpen, setIsRentOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openRentModal() {
    setIsRentOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          {/* Background Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {/* Modal Container */}
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
                <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <div className="grid md:grid-cols-2 gap-3 ">
                    {/* Car Images */}
                    <section className="grid grid-rows-3 gap-3 h-52 md:h-full">
                      <div className="relative w-full h-full row-span-2">
                        {car?.images && (
                          <img
                            src={car?.images[0]?.url || "cover.jpg"}
                            alt="Car"
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 row-span-1">
                        {Array(3)
                          .fill(null)
                          .map((_, index) => (
                            <div key={index} className="relative w-full h-full">
                              <img
                                src={
                                  car?.images?.[index + 1]?.url || "cover.jpg"
                                }
                                alt="Car Thumbnail"
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                      </div>
                    </section>

                    {/* Car Description */}
                    <section className="flex flex-col gap-3 p-2">
                      <h2 className="text-xl font-semibold">{car?.carType}</h2>
                      <div className="flex items-center text-xs gap-1">


<ArrayStar rating={Math.floor(Math.random() * 5) + 1} />
                        <span>
                          {Math.floor(Math.random() * 1000) + 50} Reviews
                        </span>
                      </div>
                      <p className="text-xs font-serif leading-5">
                        {car?.description}
                      </p>

                      {/* Car Details */}
                      <div className="mt-3 grid grid-cols-2 gap-2 md:gap-9">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <p>Car Type</p>
                            <span className="text-xs font-bold">{car?.carType}</span>
                          </div>
                          <div className="flex justify-between">
                            <p>Transmission</p>
                            <span className="text-xs font-bold">
                              {car?.transmission}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <p>Capacity</p>
                            <span className="text-xs font-bold">
                              {car?.peoplecapacity} Person
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <p>Fuel Capacity</p>
                            <span className="text-xs font-bold">
                              {car?.fuelCapacity}L
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Rent Button */}
                      <div className="flex justify-between mt-2">
                        <div>
                          <p className="text-md">
                            ETB {car?.price}
                            <sub className="text-xs">/day</sub>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={openRentModal}
                          className="bg-yellow-500 text-white py-1 px-3 text-xs rounded-md"
                        >
                          Rent Now
                        </button>
                      </div>

                      {/* Rent Component */}
                      {/* <Rent
                        carId={car?._id}
                        setIsOpen={setIsOpen}
                        isRentOpen={isRentOpen}
                        setIsRentOpen={setIsRentOpen}
                      /> */}
                    </section>
                  </div>
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute bg-white rounded-full px-3 py-1.5 font-bold text-sm top-3 right-3"
                  >
                    X
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;


