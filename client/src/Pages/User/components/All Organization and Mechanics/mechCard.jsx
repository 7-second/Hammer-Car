import { useState } from "react";
import { Link } from "react-router-dom";


const MechanicCard = () => {

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [experience, setExperience] = useState("5");
  const [specialties, setSpecialties] = useState("Engine Repair, Brake Services");
  const [profilePicture, setProfilePicture] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // Validate form data
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!experience) newErrors.experience = "Experience is required.";
    if (!specialties) newErrors.specialties = "Specialties are required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save the updated profile data (e.g., send to server)
      console.log("Profile updated:", { name, email, phone, experience, specialties, profilePicture });
      setIsEditing(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>

  

     </>
  );
};

export default MechanicCard;
