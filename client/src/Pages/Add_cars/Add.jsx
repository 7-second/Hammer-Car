"use client"
import { useEffect, useState } from 'react';
import * as Z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';



const addCarSchema = Z.object({
  carTitle: Z.string().min(1, { message: 'Title Required' }),
  carType: Z.enum(["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"])
    .refine(val => val.length > 0, { message: 'Type Required' }),
    cartype: Z.enum([ "rent", "sell"])
    .refine(val => val.length > 0, { message: 'Type Required' }),

  price: Z.string().min(1, { message: "Price Required" }),
  peoplecapacity: Z.string().min(1, { message: "Capacity in Person Required" }),
  transmission: Z.enum(["Auto", "Manual"])
    .refine(val => val.length > 0, { message: 'Type Required' }),
  location: Z.string().min(1, { message: 'Location Required' }),
  fuelCapacity: Z.string().min(1, { message: "Fuel Capacity Required" }),
  description: Z.string().min(1, { message: 'Description Required' }),
  images: Z.array(Z.string()).optional(),
});


const AddCarForm = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
    }
  });

  useEffect(() => {
    register('images'); // manually register the file input
  }, [register]);


  const [selectedImages, setSelectedImages] = useState([]);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);
      const fileNames = filesArray.map(file => file.name);
      setValue('images', fileNames);
    }

  };

  const onSubmit = async (data) => {

    const formData = new FormData()

    // Handle form submission here 
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    selectedImages.forEach(image => formData.append('images', image));

    // formData.append("owner", userID)
    try {
      setIsLoading(true)
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}car/add-car`, formData)
      toast.success("Car Registered SuccessFully")
      reset()
    } catch (error) {
      toast.error("Errror happen")
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 p-4'>
      <div className='leading-3'>
        <h3 className='text-sm font-semibold'>Add a Car for Rent </h3>
        <span className='text__medium'>please enter your car info</span>
      </div>
      <h1 className='text-md text-blue-500 font-normal'>Car info</h1>
      <div className='grid md:grid-cols-2 gap-3 md:gap-x-6 gap-y-8 p-2'>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Car Title</label>
          <input
            {...register('carTitle')}
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
            placeholder='Your Title' />
          {errors.carTitle && <p className='text-red-500 text-xs'>{errors.carTitle.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Car Type</label>
          <select
            {...register('carType')}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
            <option value="">select</option>
            <option value="Sport">Sport</option>
            <option value="SUV">SUV</option>
            <option value="MPV">MPV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          {errors.carType && <p className='text-red-500 text-xs'>{errors.carType.message}</p>}

        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Car Type</label>
          <select
            {...register('cartype')}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
               <option value="">select</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>     
          </select>
          {errors.cartype && <p className='text-red-500 text-xs'>{errors.cartype.message}</p>}

        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'> Price</label>
          <input
            {...register('price')}
            type="number"
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
            placeholder='Price in ETH (Birr)' />
          {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>ppeople Capacity</label>
          <input
            {...register('peoplecapacity')}
            type="number"
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
            placeholder="Capacity in persons" />
          {errors.peoplecapacity && <p className='text-red-500 text-xs'>{errors.peoplecapacity.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Transmission</label>
          <select
            {...register('transmission')}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
            <option value="">select</option>
            <option value="Auto">Auto</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && <p className='text-red-500 text-xs'>{errors.transmission.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Location</label>
          <input
            {...register('location')}
            placeholder="Your City"
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
          {errors.location && <p className='text-red-500 text-xs'>{errors.location.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Fuel Capacity</label>
          <input
            {...register('fuelCapacity')}
            type="number"
            placeholder="Fuel Capacity in liters"
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
          {errors.fuelCapacity && <p className='text-red-500 text-xs'>{errors.fuelCapacity.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-xs font-bold'>Short Description</label>
          <input
            {...register('description')}
            placeholder="Enter a short Description"
            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
          {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h3 className='text-xs font-bold'>Upload Images</h3>
        <label
          htmlFor="images"
          className="flex flex-col gap-1 justify-center items-center w-full h-52 border-2 border-dashed rounded-sm overflow-auto p-5">
          {selectedImages.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
              {selectedImages.map((image, index) => (
                <div key={index} className="w-52 h-52 overflow-hidden rounded-md">
                  <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <MdOutlineFileUpload className="text-2xl text__medium" />
              <p className="text__medium font-bold">Drag and drop an image or Browse</p>
              <span className="text__medium">High resolution Images (.png .jpg .gif)</span>
            </>
          )}
          {errors.images && <p className='text-red-500 text-xs'>{errors.images.message}</p>}
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
      <div className='mt-6 flex flex-col gap-2 items-end'>
        <button
          disabled={isLoading}
          type="submit"
          className={`flex items-center justify-center ${isLoading ? "bg-gray-500" : "bg-blue-500"} py-2 px-5 text-xs font-medium text-white rounded-md min-w-32 max-w-32`}>
          {isLoading ? <VscLoading /> : "Register Car"}
        </button>
        {/* {!userID &&
                    <p className='text-red-500 text-sm animate-bounce'>Login First</p>
                } */}
      </div>
      <Toaster position='top-center' />
    </form>
  )
}

export default AddCarForm