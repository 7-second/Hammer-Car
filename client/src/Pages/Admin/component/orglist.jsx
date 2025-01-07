import { useEffect, useState } from "react";
import ShowTable from "./Table";
import axios from "axios";


function OrganizationList(){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getusers = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}user?role=organization`
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
  
    return(
        <>
        <div className="flex flex-col items-center justify-center mt-16">
               <div className="flex flex-row items-center justify-center">
                 <h2 className="bg-blue-500 rounded-lg px-20 text-white">Organization Lists</h2>
               </div>
               <div className=" ">
                 <ShowTable users={users} />
               </div>
             </div>
        </>
    )
}
export default OrganizationList;