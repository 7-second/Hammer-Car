import { Link } from "react-router-dom";

function MechanicProfile() {
    let currentUser;
    const user = localStorage.getItem("mechanic_data");
    if (user) {
      currentUser = JSON.parse(user);
    }
  
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
  
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Welcome, <span className="text-blue-600">{currentUser.username}</span>!
          </h2>
          
          {/* Profile Information Section */}
          <div className="text-lg text-gray-700 mb-4">
            <div className="mb-2">
              <strong className="font-semibold">Full Name:</strong> {currentUser.name}
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Phone:</strong> {currentUser.phone || "Not provided"}
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Email:</strong> {currentUser.email || "Not provided"}
            </div>
            <div className="mb-2">
              <strong className="font-semibold">Location:</strong> {currentUser.location || "Not provided"}
            </div>
           
          </div>
  
          {/* Call to Action */}
          <div className="text-center mt-6">
            <Link to="/mechanichome">
         
            <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default MechanicProfile;
  