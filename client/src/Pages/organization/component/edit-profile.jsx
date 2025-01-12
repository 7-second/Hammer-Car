"use client";
import axios from "axios";
import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const EditOrgProfile = ({ currentUser, isEditPrOpen, setIsEditProOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleProfileChange = (e) => setProfileImage(e.target.files[0]);
  const handleCoverChange = (e) => setCoverImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userID = currentUser?.id;
    if (!userID) {
      toast.error("User ID is missing. Cannot update profile.");
      return;
    }
  
    const formData = new FormData();
    formData.append("username", currentUser.username);
    formData.append("email", email);
  
    if (profileImage) formData.append("profilePicture", profileImage);
    if (coverImage) formData.append("coverPicture", coverImage);
  
    try {
      setIsLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-profile/${userID}`,
        formData
      );
      toast.success("Profile successfully updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
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
                <Dialog.Panel className="relative w-full max-w-xl transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <p className="text-md text-center mt-3">
                    Username: <span className="font-bold">{currentUser?.username}</span>
                  </p>
                 
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 p-4 mt-4">
                      <div className="flex flex-col gap-4">
                        <label className="text-md">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleEmailChange}
                          className="text-sm p-2 border-2 rounded-md"
                          required
                          aria-label="Email"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <label htmlFor="profile" className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer">
                          {profileImage ? (
                            <img
                              src={URL.createObjectURL(profileImage)}
                              alt="Profile preview"
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : currentUser?.profilePicture ? (
                            <img
                              src={currentUser.profilePicture}
                              alt="Profile"
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : (
                            <>
                              <MdOutlineFileUpload className="text-2xl" />
                              <p>Upload Profile</p>
                            </>
                          )}
                        </label>
                        <input type="file" id="profile" accept="image/*" hidden onChange={handleProfileChange} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <label htmlFor="cover" className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer">
                          {coverImage ? (
                            <img
                              src={URL.createObjectURL(coverImage)}
                              alt="Cover preview"
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : currentUser?.coverPicture ? (
                            <img
                              src={currentUser.coverPicture}
                              alt="Cover"
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : (
                            <>
                              <MdOutlineFileUpload className="text-2xl" />
                              <p>Upload Cover</p>
                            </>
                          )}
                        </label>
                        <input type="file" id="cover" accept="image/*" hidden onChange={handleCoverChange} />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
                    >
                      {isLoading ? <VscLoading size={20} /> : "Update"}
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-3 right-3 px-4 py-2 text-sm font-bold bg-white rounded-full"
                  >
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
