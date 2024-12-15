import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header';
// import EditProfile from './edit-profile'


function Profile ({ currentUser }) {


    // let [isEditPrOpen, setIsEditProOpen] = useState(false)
    // function openEditProModal() {
    //     setIsEditProOpen(true)
    // }

  // Get user

  const user = localStorage.getItem("users_data")
  if (user) {
      currentUser = JSON.parse(user)
  }
  console.log(currentUser, "user")


    useEffect(() => {

    const getusers = async () => {
        try {
  
            const response = await axios.get( `${import.meta.env.VITE_API_BASE_URL}show-details/${currentUser._id}`);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    getusers()
    
},[])


    return (
        <>
        <Header/>
        <main className='w-full md:px-12 p-6 flex flex-col gap-3 bg-white'>

            <div className='relative w-full'>
                <div className='relative w-full '>
                    {/* Cover Image */}
                    {currentUser?.coverPicture &&
                        <img
                            src={`${currentUser?.coverPicture}`}
                            alt="profile Picture"
                            className='object-cover rounded-md' />
                    }
                    {/* Profile Picture */}
                    {currentUser?.profilePicture &&
                        <img
                            src={`${currentUser?.profilePicture}`}
                            alt="profilePicture"
                            width={60}
                            height={60}
                            className='!w-16 !h-16 absolute -bottom-6 left-5 object-cover rounded-full shadow-2xl' />
                    }
                </div>
                <div className='flex justify-between md:px-8 w-full mt-8'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-sm text-black'>{currentUser?.username}</h2>
                        <p className='text__medium text-black'>{currentUser?.email}</p>
                    </div>
{/* 
                    <button
                        type="button"
                        onClick={openEditProModal}
                        className='btn__bg rounded-md px-2 text-xs text-white'>
                        Edit Profile
                    </button> */}
                    {/* <EditProfile
                        currentUser={currentUser}
                        isEditPrOpen={isEditPrOpen}
                        setIsEditProOpen={setIsEditProOpen}
                    /> */}
                </div>
            </div>
        </main>
   </> )
}

export default Profile