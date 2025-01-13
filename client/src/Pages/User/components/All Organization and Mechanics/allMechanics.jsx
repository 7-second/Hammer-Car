import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=mechanic`
        );
        setMechanics(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch mechanics");
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  if (loading) return <p>Loading mechanics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mechanics.map((mechanic) => (
        <div key={mechanic._id} className="shadow-lg rounded-lg overflow-hidden">
          <Link to={`/mechdetail/${mechanic._id}`}>
            <div className="px-3 py-4 flex items-center gap-4">
              <img
                className="object-cover rounded-full w-16 h-16"
                src={mechanic.profilePicture || "https://via.placeholder.com/150"}
                alt={`${mechanic.username} profile`}
              />
              <div>
                <h3 className="font-semibold text-lg">{mechanic.username}</h3>
                <p className="text-gray-600">{mechanic.name}</p>
              </div>
            </div>
          </Link>
          
          <Link to={`/mechdetail/${mechanic._id}`}>
            <div className="relative w-full h-40">
              <img
                src={mechanic.coverPicture || "https://via.placeholder.com/300"}
                alt={mechanic.name}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </Link>

          <div className="px-3 py-2">
            <h4 className="font-medium text-gray-800">{mechanic.name}</h4>
            <p>{mechanic.experience} years of experience</p>
            <p className="text-gray-600">{mechanic.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-gray-200 px-3 py-1 text-sm rounded-full">{mechanic.services?.length || 0} Services</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMechanics;
