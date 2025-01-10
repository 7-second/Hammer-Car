import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OwnerProfile = () => {
  const { username } = useParams();  // Get the username from URL params
  const [owner, setOwner] = useState(null); // Initialize owner state

  // Fetch the owner data using the username from the URL
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(`/api/owners/${username}`);
  
        // Check if the response is in JSON format
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
  
        const data = await response.json();
        setOwner(data);
      } catch (error) {
        console.error('Error fetching owner data:', error);
        // Display a message to the user in case of an error
        setOwner(null);
      }
    };
  
    fetchOwnerData();
  }, [username]);
  

  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Owner Profile</h1>
      <p>Username: {owner.username}</p>
      <img src={owner.profilePicture} alt="Owner" />
      {/* You can display other owner information here */}
    </div>
  );
};

export default OwnerProfile;
