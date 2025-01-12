import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const OrgProfile = () => {
  const { username } = useParams(); // Get the username from the URL parameter
  const location = useLocation(); // Use useLocation to access state passed via the Link
  // const [organization, setOrganization] = useState(null);
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the owner data passed through state (if available)
  const owner = location.state?.owner;

  useEffect(() => {
    const getCars = async () => {
      try {
        const getInfo = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user/${username}`
        );
        setUser(getInfo.data);

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}car`,
          {
            params: {
              userType: "organization", // Specify the user type
              organizationId: username, // Pass the organization ID
            },
          }
        );
        setCars(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [username]); // Only depend on username as the organization is fetched based on that

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <div>
          <h1 className="text-4xl font-bold text-black">{user.usename}</h1>
          {/* <p>{organization.description}</p> */}

          <h2 className="text-3xl font-bold mt-6">
            Cars Owned by {user.username}
          </h2>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={car.images[0]?.url || "/path/to/default-car.jpg"}
                    alt={car.carModel}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{car.carModel}</h3>
                    <p>{car.carBrand}</p>
                    <p>Price: {car.price}</p>
                    <p>Location: {car.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No cars listed by this organization.</p>
          )}
        </div>
      ) : (
        <p className="text-center text-red-500">Organization not found.</p>
      )}
    </div>
  );
};

export default OrgProfile;
