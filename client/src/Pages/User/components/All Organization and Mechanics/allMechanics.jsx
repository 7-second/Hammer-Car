import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function AllMechanics() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=mechanic`
        );
        setOrganizations(response?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000); // Simulate a delay for 5 seconds
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {organizations.map((org) => {
        const randomRating = Math.floor(Math.random() * 5) + 1;

        return (
          <div key={org.id} className="shadow-lg">
            <div className="px-3 flex gap-3 items-center">
              <img
                className="object-cover rounded-full w-10 h-10"
                src={org.profilePicture || "https://via.placeholder.com/150"}
                alt={`${org.username} logo`}
              />
              <h3 className="font-sans font-medium">{org.username}</h3>
            </div>
            <div className="rounded-lg">
              <img
                src={org.coverPicture || "https://via.placeholder.com/300"}
                alt={org.name}
                className="w-full px-3 pt-3 h-40 object-cover"
              />
            </div>
            <div className="px-3 py-2 flex flex-col gap-2">
              <h2 className="font-serif">{org.name}</h2>
              <h3>
                <Rating
                  className=""
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
                {org.carCount || 0} Car{org.carCount > 1 ? "s" : ""} for Rent
                and Sale
              </h1>
            </div>
            <div className="py-1 px-2 flex justify-end">
              <button className="bg-blue-600 hover:bg-purple-600 focus:bg-slate-400 rounded-md px-2 text-white font-sans">
                <Link to={`/orgdetail/${org.id}`}>More</Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllMechanics;
