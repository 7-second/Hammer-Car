import { useEffect, useState } from "react";
import ShowTable from "./Table";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}user?role=user`
        );
        setUsers(response?.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000); // 5 seconds loading time
      }
    };

    getusers();
  }, []);

  // Function to handle deletion
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}user/${userId}` // Use userId to delete
      );
      alert(response.data.message);  // Display success message
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Filter out the deleted user from the state
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };
  


  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-row items-center justify-center">
          <h2 className="bg-blue-500 rounded-lg px-20 text-white">Users Lists</h2>
        </div>
        <div>
          {/* Pass the handleDelete function to ShowTable */}
          <ShowTable users={users} setUsers={setUsers} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}
export default UserList;
