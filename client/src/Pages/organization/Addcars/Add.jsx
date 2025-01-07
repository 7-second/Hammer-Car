"use client";
import { useEffect, useState } from "react";
import * as Z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";

const addCarSchema = Z.object({
  carModel: Z.enum([
    "Corolla",
    "Vitz",
    "Yaris",
    "Hilux",
    "LandCruiser",
    "Rav4",
    "Camry",
    "HyundaiAccent",
    "HyundaiSanta",
    "Dzire",
    "Swift",
    "Alto",
    "Sunny",
    "Patrol",
    "Navara",
    "XTrail",
    "Civic",
    "Fit",
    "Lancer",
    "Pajero",
    "Outlander",
    "Jetta",
    "Passat",
    "Golf",
  ]).refine((val) => val.length > 0, { message: "Model Required" }),
  carType: Z.enum(["rent", "sell"]).refine((val) => val.length > 0, {
    message: "Type Required",
  }),
  price: Z.string().min(1, { message: "Price Required" }),
  peopleCapacity: Z.string().min(1, { message: "Capacity in Person Required" }),
  transmission: Z.enum(["Auto", "Manual"]).refine((val) => val.length > 0, {
    message: "Transmission Required",
  }),
  carBrand: Z.enum([
    "Toyota",
    "Hyundai",
    "Suzuki",
    "Nissan",
    "Volswagen",
    "Byd",
    "Lifan",
    "Jetour",
    "Honda",
    "LandRover",
    "SinoTruck",
    "Mitsubishi",
    "Chery",
  ]).refine((val) => val.length > 0, { message: "Brand Required" }),
  engine: Z.enum(["Diesel", "Petrol", "Electric", "Gas"]).refine(
    (val) => val.length > 0,
    { message: "Engine Required" }
  ),
  CC: Z.enum([
    "800",
    "1000",
    "1200",
    "1500",
    "1800",
    "2000",
    "2500",
    "2800",
    "3000",
    "3200",
    "3500",
    "4400",
    "5000",
    "6000",
    "6500",
    "8000",
  ]).refine((val) => val.length > 0, { message: "CC Required" }),
  fuelCapacity: Z.string().min(1, { message: "Fuel Capacity Required" }),
  location: Z.string().min(1, { message: "Location Required" }),
  description: Z.string().min(1, { message: "Description Required" }),
  images: Z.array(Z.string()).nonempty({
    message: "At least one image is required",
  }),
  year: Z.string().min(1, { message: "Year Required" }),
});

const AddCarForm = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addCarSchema),
    defaultValues: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    register("images"); // manually register the file input
  }, [register]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);
      const fileNames = filesArray.map((file) => file.name);
      setValue("images", fileNames);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    let currentUser;
    const user = localStorage.getItem("organization_data");
    if (user) {
      currentUser = JSON.parse(user);
    }

    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    selectedImages.forEach((image) => formData.append("images", image));

    formData.append("owner", currentUser._id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}car/add-car`,
        formData
      );
      console.log("Form submitted successfully:", response.data);
      toast.success("Car registered successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server Response Data:", error.response.data); // Log the server's response
          toast.error(error.response.data.error || "Failed to register car"); // Use the error message from the server
      } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          toast.error("No response from server");
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
          toast.error("Request setup error");
      }
  } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col -mt-4 gap-3 p-4"
    >
      <div className="leading-3 flex flex-col items-center justify-center bg-blue-400 h-fit rounded-lg pb-4">
        <h3 className="text-sm font-semibold">Add a Car </h3>
        <span className="text__medium text-white">
          please enter your car info
        </span>
      </div>
      <h1 className="text-md text-blue-500 font-normal">Car info</h1>
      <div className="grid md:grid-cols-2 gap-3 md:gap-x-6 gap-y-8 p-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Car Brand</label>
          <select
            {...register("carBrand")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="Toyota">Toyota</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Nissan">Nissan</option>
            <option value="Volswagen">Volswagen</option>
            <option value="Byd">Byd</option>
            <option value="Lifan">Lifan</option>
            <option value="Jetour">Jetour</option>
            <option value="Honda">Honda</option>
            <option value="LandRover">LandRover</option>
            <option value="SinoTruck">SinoTruck</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Chery">Chery</option>
          </select>
          {errors.CarBrand && (
            <p className="text-red-500 text-xs">{errors.CarBrand.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Car Model</label>
          <select
            {...register("carModel")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="Corolla">Corolla</option>
            <option value="Yaris">Yaris</option>
            <option value="Vitz">Vitz</option>
            <option value="Hilux">Hilux</option>
            <option value="LandCruiser">LandCruiser</option>
            <option value="Rav">Rav4</option>
            <option value="Camry">Camry</option>
            <option value="HyundaiAccent">Hyundai Accent</option>
            <option value="HyundaiSanta">Hyundai Santa</option>
            <option value="Dzire">Dzire</option>
            <option value="Swift">Swift</option>
            <option value="Alto">Alto</option>
            <option value="Sunny">Sunny</option>
            <option value="Patrol">Patrol</option>
            <option value="Navara">Navara</option>
            <option value="XTrail">X-Trail</option>
            <option value="Fit">Fit</option>
            <option value="Lancer">Lancer</option>
            <option value="Pajero">Pajero</option>
            <option value="Outlander">Outlander</option>
            <option value="Jetta">Jetta</option>
            <option value="Passat">Passat</option>
            <option value="Golf">Golf</option>
          </select>
          {errors.CarModel && (
            <p className="text-red-500 text-xs">{errors.CarModel.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Engine Type</label>
          <select
            {...register("engine")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Gas">Gas</option>
          </select>
          {errors.Engine && (
            <p className="text-red-500 text-xs">{errors.Engine.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Horse Power</label>
          <select
            {...register("CC")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="800">800CC</option>
            <option value="1000">1000CC</option>
            <option value="1200">1200CC</option>
            <option value="1500">1500CC</option>
            <option value="1800">1800CC</option>
            <option value="2000">2000CC</option>
            <option value="2500">2500CC</option>
            <option value="2800">2800CC</option>
            <option value="3000">3000CC</option>
            <option value="3200">3200CC</option>
            <option value="3500">3500CC</option>
            <option value="4400">4400CC</option>
            <option value="5000">5000CC</option>
            <option value="6000">6000CC</option>
            <option value="6500">6500CC</option>
            <option value="8000">8000CC</option>
          </select>
          {errors.Cc && (
            <p className="text-red-500 text-xs">{errors.Cc.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Car For</label>
          <select
            {...register("carType")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
          {errors.Cartype && (
            <p className="text-red-500 text-xs">{errors.Cartype.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Price</label>
          <input
            {...register("price")}
            type="number"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
            placeholder="Price in ETH (Birr)"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Year</label>
          <input
            {...register("year")}
            type="number"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
            placeholder="Price in ETH (Birr)"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">People Capacity</label>
          <input
            {...register("peopleCapacity")}
            type="number"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
            placeholder="Capacity in persons"
          />
          {errors.peoplecapacity && (
            <p className="text-red-500 text-xs">
              {errors.peoplecapacity.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Transmission</label>
          <select
            {...register("transmission")}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="">select</option>
            <option value="Auto">Auto</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && (
            <p className="text-red-500 text-xs">
              {errors.transmission.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Location</label>
          <input
            {...register("location")}
            placeholder="Your City"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          />
          {errors.location && (
            <p className="text-red-500 text-xs">{errors.location.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Fuel Capacity</label>
          <input
            {...register("fuelCapacity")}
            type="number"
            placeholder="Fuel Capacity in liters"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          />
          {errors.fuelCapacity && (
            <p className="text-red-500 text-xs">
              {errors.fuelCapacity.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold">Short Description</label>
          <input
            {...register("description")}
            placeholder="Enter a short Description"
            className="bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-xs font-bold">Upload Images</h3>
        <label
          htmlFor="images"
          className="flex flex-col gap-1 justify-center items-center w-full h-52 border-2 border-dashed rounded-sm overflow-auto p-5"
        >
          {selectedImages.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="w-52 h-52 overflow-hidden rounded-md"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <MdOutlineFileUpload className="text-2xl text__medium" />
              <p className="text__medium font-bold">
                Drag and drop an image or Browse
              </p>
              <span className="text__medium">
                High resolution Images (.png .jpg .gif)
              </span>
            </>
          )}
          {errors.images && (
            <p className="text-red-500 text-xs">{errors.images.message}</p>
          )}
        </label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 items-center">
        <button
          disabled={isLoading}
          type="submit"
          className={`flex items-center justify-center ${
            isLoading ? "bg-gray-500" : "bg-blue-500"
          } py-2 px-5 hover:bg-blue-700 text-xs font-medium text-white rounded-md min-w-32 max-w-32`}
        >
          {isLoading ? <VscLoading /> : "Register Car"}
        </button>
      </div>
      <Toaster position="top-center" />
    </form>
  );
};

export default AddCarForm;
