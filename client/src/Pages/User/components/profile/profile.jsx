import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ }) {
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [carSelled, setCarSelled] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize currentUser from localStorage if not passed as a prop
  let currentUser
  const user = localStorage.getItem("users_data")
  if (user) {
    currentUser = JSON.parse(user)
  }

  useEffect(() => {
  
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user/show-details/${currentUser._id}`
        );

        // Check and log the response for debugging
        console.log('User Data:', response.data);

        setUserData(response.data);
        setFollowedOrganizations(response.data.organizationDetails || []);

        setCarSelled(response.data.sell || []);


      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);


  return (
    <main className="w-full md:px-12 p-6 flex flex-col gap-3 bg-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="relative w-full">
            <div className="relative w-full">
              {/* Cover Image */}
              {currentUser?.coverPicture && (
                <img
                  src={currentUser.coverPicture}
                  alt="Cover"
                  className="object-cover rounded-md"
                />
              )}
              {/* Profile Picture */}
              {currentUser?.profilePicture && (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="!w-16 !h-16 absolute -bottom-6 left-5 object-cover rounded-full shadow-2xl"
                />
              )}
            </div>
            <div className="flex justify-between md:px-8 w-full mt-8">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm text-black">{currentUser.username}</h2>
                <p className="text__medium text-black">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Display Followed Organizations */}
          <div className="mt-6">
            <h3 className="font-bold text-xl">Followed Organizations</h3>
            <ul className="mt-3">
              {followedOrganizations.length > 0 ? (
                followedOrganizations.map((org) => (
                  <li key={org._id} className="text-lg">
                    <div className="flex gap-3 items-center">
                      <img
                        className="object-cover rounded-full w-10 h-10"
                        src={org.profilePicture || 'https://via.placeholder.com/150'}
                        alt={`${org.username || 'Organization'} logo`}
                      />
                      <span>{org.username || 'No Name Available'}</span>
                    </div>
                  </li>
                ))
              ) : (
                <p>No organizations followed yet.</p>
              )}
            </ul>
          </div>


          {/* Buy Cars  */}
          {/* carSelled */}
        </>
      )}
    </main>
  );
}

export default Profile;
