import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile({ currentUser }) {
  const [followedOrganizations, setFollowedOrganizations] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  // Initialize currentUser from localStorage if not passed as a prop
  const user = localStorage.getItem('users_data');
  const userParsed = user ? JSON.parse(user) : null;
  const finalUser = currentUser || userParsed;

  if (!finalUser) {
    return <div>Loading or no user data available...</div>;  // Display loading or error if no user data is found
  }

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}show-details/${finalUser._id}`
        );
        console.log(response.data);  // Log the entire response to check followedOrganizations
        setUserData(response.data);

        const followedOrgs = response.data.followedOrganizations || [];
        console.log('Followed organizations:', followedOrgs); // Log the followed organizations

        // Fetch details of each followed organization
        const orgDetails = await Promise.all(
          followedOrgs.map(async (orgId) => {
            const orgResponse = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}organization/${orgId}`
            );
            return orgResponse.data;
          })
        );

        // Log the organization names
        orgDetails.forEach(org => {
          console.log('Organization Name:', org.name);  // Log each organization's name
        });

        console.log('Organization details:', orgDetails); // Log the fetched organization details
        setFollowedOrganizations(orgDetails);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    if (finalUser) {
      getusers();
    }
  }, [finalUser]);

  return (
    <main className="w-full md:px-12 p-6 flex flex-col gap-3 bg-white">
      {loading ? (
        <div>Loading...</div>  // Show loading state
      ) : (
        <>
          <div className="relative w-full">
            <div className="relative w-full">
              {/* Cover Image */}
              {finalUser?.coverPicture && (
                <img
                  src={finalUser?.coverPicture}
                  alt="profile Picture"
                  className="object-cover rounded-md"
                />
              )}
              {/* Profile Picture */}
              {finalUser?.profilePicture && (
                <img
                  src={finalUser?.profilePicture}
                  alt="profilePicture"
                  width={60}
                  height={60}
                  className="!w-16 !h-16 absolute -bottom-6 left-5 object-cover rounded-full shadow-2xl"
                />
              )}
            </div>
            <div className="flex justify-between md:px-8 w-full mt-8">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm text-black">{finalUser?.username}</h2>
                <p className="text__medium text-black">{finalUser?.email}</p>
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
                        alt={`${org.name} logo`}
                      />
                      <span>{org.name || 'No Name'}</span>  {/* Handle missing organization name */}
                    </div>
                  </li>
                ))
              ) : (
                <p>No organizations followed yet.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}

export default Profile;
