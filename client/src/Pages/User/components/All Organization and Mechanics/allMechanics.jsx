import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function AllMechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=mechanic`
        );
        setMechanics(response?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mechanics.map((mechanic) => {
        const randomRating = Math.floor(Math.random() * 5) + 1;

        return (
          <div key={mechanic.id} className="shadow-lg">
            {/* Clickable Profile Image and Username */}
            <Link to={`/mechdetail/${mechanic.username}`} className="px-3 flex gap-3 items-center">
              <img
                className="object-cover rounded-full w-10 h-10"
                src={mechanic.profilePicture || "https://via.placeholder.com/150"}
                alt={`${mechanic.username} logo`}
              />
              <h3 className="font-sans font-medium">{mechanic.username}</h3>
            </Link>

            {/* Cover Picture */}
            <div className="rounded-lg">
              <img
                src={mechanic.coverPicture || "https://via.placeholder.com/300"}
                alt={mechanic.name}
                className="w-full px-3 pt-3 h-40 object-cover"
              />
            </div>

            {/* Mechanic Details */}
            <div className="px-3 py-2 flex flex-col gap-2">
              <h2 className="font-serif">{mechanic.name}</h2>
              <h3>
                <Rating
                  size="small"
                  name="read-only"
                  value={randomRating}
                  readOnly
                />
              </h3>
              <p className="text-sm">{mechanic.specialties || "Specialties not available"}</p>
              <p className="text-sm">{mechanic.yearsOfExperience} years of experience</p>
              <p className="text-sm">
                {mechanic.address || "Address not available"}
              </p>
              <p className="text-sm">
                {mechanic.phone || "Phone number not available"}
              </p>
            </div>

            {/* "More" Button */}
            <div className="py-1 px-2 flex justify-end">
              <Link to={`/mechdetail/${mechanic.id}`}>
                <button className="bg-blue-600 hover:bg-purple-600 focus:bg-slate-400 rounded-md px-2 text-white font-sans">
                  More
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllMechanics;
