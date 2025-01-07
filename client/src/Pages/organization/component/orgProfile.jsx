import axios from "axios"
import { useEffect, useState } from "react"
import EditOrgProfile from "./edit-profile"

function OrgProfile(){

     let [isEditPrOpen, setIsEditProOpen] = useState(false)
    function openEditProModal() {
        setIsEditProOpen(true)
    }

    // get users
    let currentUser
  const user = localStorage.getItem("organization_data")
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
    return(
        <>
        <div className="w-full  flex flex-col items-center justify-center h-fit ">

            <div className="flex items-center w-3/4  h-fit ">
                <img src={currentUser.coverPicture} alt="cover images"
                  className="w-full h-80 rounded-xl"
                />
                 
            </div>
            <div className="h-fit w-fit flex  items-start ">
                <img src={currentUser.profilePicture} alt="profile picture"
                    className="w-56 h-56 absolute -mt-40 flex -ml-96 rounded-full "
                />
            </div>
            <div className="mr-64 ">
                <h2 className="font-bold text-2xl">
                    {currentUser.username}
                </h2>
            </div>

            <button
                        type="button"
                        onClick={openEditProModal}
                        className='btn__bg rounded-md text-white text-xs bg-blue-500 px-5 rounded-g'>
                        Edit Profile
                    </button> 
                    <EditOrgProfile
                        currentUser={currentUser}
                        isEditPrOpen={isEditPrOpen}
                        setIsEditProOpen={setIsEditProOpen}
                    />


        </div>
        
        
        </>
    )
}
export default OrgProfile