"use client";
import axios from 'axios';
import { Fragment, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react'; // Import Dialog and Transition
import { MdOutlineFileUpload } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import { useRouteError } from 'react-router-dom';

const EditOrgProfile = ({ currentUser, isEditPrOpen, setIsEditProOpen }) => {
   
    const [pathname,setPathname] =useState()
    const [router,setRouter] =useState()
    // const userID = pathname.split("/").pop();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(currentUser?.email || "");
    const [profileImage, setProfileImage] = useState(null); // Initialize as null
    const [coverImage, setCoverImage] = useState(null); // Initialize as null

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleProfileChange = (e) => setProfileImage(e.target.files[0]); // Get the first file
    const handleCoverChange = (e) => setCoverImage(e.target.files[0]); // Get the first file

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", currentUser?.username);
        formData.append("email", currentUser?.email);

        if (profileImage) {
            formData.append("profilePicture", profileImage);
        }
        if (coverImage) {
            formData.append("coverPicture", coverImage);
        }

        try {
            setIsLoading(true);
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user/update-profile/${userID}`, formData);
            toast.success("Profile Successfully Updated");
            router.push("/");
        } catch (error) {
            console.error(error, "update error");
            toast.error("Failed to update profile."); // Display error toast
        } finally {
            setIsLoading(false);
            setIsEditProOpen(false);
            setProfileImage(null); // Reset to null
            setCoverImage(null); // Reset to null
        }
    };

    const closeModal = () => setIsEditProOpen(false);

    return (
        <>
            <Transition appear show={isEditPrOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                <Dialog.Panel className="relative w-full max-w-xl transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                                    <p className='text-md text-center mt-3'>
                                        Username: <span className='font-bold'>{currentUser?.username}</span>
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <div className='grid md:grid-cols-2 gap-3 p-2 mt-4'>
                                            <section className='flex flex-col gap-3'>
                                                <div className='grid grid-cols-3 items-center gap-2'>
                                                    <label className='text-md'>Email:</label>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        defaultValue={currentUser?.email}
                                                        onChange={handleEmailChange}
                                                        className='col-span-2 text-sm p-1 border-2 rounded-md'
                                                    />
                                                </div>

                                                <div className='flex flex-col gap-2 h-36 mt-4'>
                                                    <label htmlFor="cover" className="flex flex-col gap-1 justify-center items-center w-full h-full border-2 border-dashed rounded-sm overflow-auto p-1 cursor-pointer"> {/* Added cursor-pointer */}
                                                        {coverImage ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                <img src={URL.createObjectURL(coverImage)} alt="Cover" fill className="object-cover rounded-md" />
                                                            </div>
                                                        ) : currentUser?.coverPicture ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                <img src={currentUser.coverPicture} alt='Cover' fill className="object-cover rounded-md" />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <MdOutlineFileUpload className="text-2xl text__medium" />
                                                                <p className="text__medium font-bold">Upload Cover</p>
                                                            </>
                                                        )}
                                                    </label>
                                                    <input type="file" id="cover" accept="image/*" hidden onChange={handleCoverChange} />
                                                    <p className='text-sm'>Cover Picture</p>
                                                </div>
                                            </section>

                                            <section className='flex flex-col gap-3'>
                                                <div className='flex flex-col gap-2 h-36'>
                                                    <label htmlFor="profile" className="flex flex-col gap-1 justify-center items-center w-full h-full border-2 border-dashed rounded-sm overflow-auto p-1 cursor-pointer"> {/* Added cursor-pointer */}
                                                        {profileImage ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                <img src={URL.createObjectURL(profileImage)} alt="Profile" fill className="object-cover rounded-md" />
                                                            </div>
                                                        ) : currentUser?.profilePicture ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                <img src={currentUser.profilePicture} alt='Profile' fill className="object-cover rounded-md" />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <MdOutlineFileUpload className="text-2xl text__medium" />
                                                                <p className="text__medium font-bold">Upload Profile</p>
                                                            </>
                                                        )}
                                                    </label>
                                                    <input type="file" id="profile" accept="image/*" hidden onChange={handleProfileChange} />
                                                    <p className='text-sm'>Profile Picture</p>
                                                </div>
                                            </section>
                                        </div>

                                        <button type='submit' className='flex justify-center items-center px-3 py-1.5 font-bold rounded-lg text-md uppercase w-full bg-blue-500 mt-8 text-white text-center'>
                                            {isLoading ? <VscLoading size={20} /> : "Update"}
                                        </button>
                                    </form>

                                    <button type='button' onClick={closeModal} className='absolute bg-white rounded-full px-3 py-1.5 font-bold text-sm top-3 right-3'>
                                        X
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Toaster />
        </>
    );
};

export default EditOrgProfile;