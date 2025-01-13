import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AllOrganization() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedOrganizations, setFollowedOrganizations] = useState({});
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("users_data");

  useEffect(() => {
    const fetchOrganizationsWithCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=organization`
        );
        const orgs = response.data || [];

        const orgsWithCars = await Promise.all(
          orgs.map(async (org) => {
            try {
              const carResponse = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}car?userType=organization&organizationId=${org._id}`
              );
              return { ...org, cars: carResponse.data || [] };
            } catch (err) {
              console.error(`Failed to fetch cars for organization ${org._id}:`, err);
              return { ...org, cars: [] };
            }
          })
        );

        setOrganizations(orgsWithCars.filter(org => org.cars.length > 0));
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationsWithCars();
  }, []);

  const toggleFollow = async (orgId, orgName, orgUsername, orgProfilePicture) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("users_data"))._id;

    try {
      if (followedOrganizations[orgId]) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}user/unfollow/${userId}`, {
          organizationId: orgId
        });
        setFollowedOrganizations((prev) => {
          const updated = { ...prev };
          delete updated[orgId];
          return updated;
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}user/follow/${userId}`, {
          organizationId: orgId,
          organizationName: orgName,
          organizationUsername: orgUsername,
          organizationProfilePicture: orgProfilePicture
        });
        setFollowedOrganizations((prev) => ({ ...prev, [orgId]: true }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {organizations.map((org) => {
        const randomRating = Math.floor(Math.random() * 5) + 1;

        return (
          <div key={org._id} className="shadow-lg">
            {/* Link entire header (image and username) to the organization's page */}
            <Link to={`/organization/${org._id}`}>
              <div className="px-3 flex gap-3 items-center">
                <img
                  className="object-cover rounded-full w-10 h-10"
                  src={org.profilePicture || "https://via.placeholder.com/150"}
                  alt={`${org.name} logo`}
                />
                <h3 className="font-sans font-medium">{org.username}</h3>
              </div>
            </Link>
            <Link to={`/organization/${org._id}`}>
              <div className="rounded-lg">
                <img
                  src={org.coverPicture || "https://via.placeholder.com/300"}
                  alt={org.name}
                  className="w-full px-3 pt-3 h-40 object-cover"
                />
              </div>
            </Link>
            <div className="px-3 py-2 flex flex-col gap-2">
              <h2 className="font-serif">{org.name}</h2>
              <h3>
                <Rating
                  className="text-sm"
                  size="small"
                  name="read-only"
                  value={randomRating}
                  readOnly
                />
              </h3>
              <p className="text-sm w-[300px]">
                {org.address || "Address not available"}
              </p>
              <h1 className="font-sans bg-slate-300 rounded-md w-fit px-2">
                {org.cars.length} Car{org.cars.length !== 1 ? "s" : ""} for Rent and Sale
              </h1>
            </div>
            <div className="py-1 px-2 flex justify-end">
              <button
                onClick={() => toggleFollow(org._id, org.name, org.username, org.profilePicture)}
                className="bg-blue-600 hover:bg-purple-600 focus:bg-slate-400 rounded-md px-2 text-white font-sans"
              >
                {followedOrganizations[org._id] ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllOrganization;
