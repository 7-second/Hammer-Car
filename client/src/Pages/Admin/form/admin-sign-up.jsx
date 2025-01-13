import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AdminForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mechanic Info State
  const [mechanicInfo, setMechanicInfo] = useState({
    name: '',
    instagram: '',
    telegram: '',
    branches: [],
    openingDays: [],
    services: [],
    experience:""
  });

  const [serviceOptions] = useState([
    'Air Filter', 'Engine Repair', 'Brake Services', 'Oil Change', 'Battery Replacement'
  ]);

  const [branchOptions] = useState([
    'Lafto', 'Megenagna', 'Saris', 'Jemo'
  ]);

  const [openingDaysOptions] = useState([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch role change for conditional validation
  const role = watch("role");

  const onSubmit = async (userData) => {
    const fullUserData = { ...userData, ...mechanicInfo };
    console.log("Full Form Data:", fullUserData); // Add this log to check the data being sent

    try {
      setIsLoading(true);

      // Ensure userData contains organizationId and other necessary fields
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/register`,
        fullUserData
      );

      if (response.status === 201) {
        toast.success("Register Success");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User already exists. Please try logging in.");
      } else if (error.response) {
        toast.error("Register Error");
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMechanicInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const updatedList = mechanicInfo[name].includes(value)
      ? mechanicInfo[name].filter(item => item !== value)
      : [...mechanicInfo[name], value];

    setMechanicInfo((prev) => ({
      ...prev,
      [name]: updatedList
    }));
  };

  return (
    <article className="w-full h-full flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 p-8 bg-white rounded-md shadow-lg w-full max-w-xl">
        <p className="text-center font-bold text-lg uppercase">Registration</p>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Example@company.com"
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.email && <p className="pt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Username (Organization/Mechanic Name) */}
        <div>
          <label>Organization Name/ Mechanic Name</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.username && <p className="pt-1 text-xs text-red-500">{errors.username.message}</p>}
        </div>

        {/* Organization ID */}
        {role && (role === "organization" || role === "mechanic") && (
          <div>
            <label>Organization ID</label>
            <input
              {...register("organizationId", { required: "Organization ID is required" })}
              className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
            />
            {errors.organizationId && <p className="pt-1 text-xs text-red-500">{errors.organizationId.message}</p>}
          </div>
        )}

        {/* Phone Number */}
        <div>
          <label>Phone Number</label>
          <input
            {...register("phone", {
              pattern: {
                value: /^\+251[0-9]{9}$/,
                message: "Please enter a valid Ethiopian phone number starting with +251",
              },
            })}
            type="tel"
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
            placeholder="e.g. +251985434363"
          />
          {errors.phone && <p className="pt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.password && <p className="pt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label>Role</label>
          <select
            {...register('role', { required: "Role is required" })}
            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
          >
            <option value="organization">Organization</option>
            <option value="mechanic">Mechanic</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
        </div>

        {/* Mechanic Info */}
        {role === "mechanic" && (
          <>
            {/* Instagram Handle */}
            <div>
              <label>Instagram Handle</label>
              <input
                type="text"
                name="instagram"
                value={mechanicInfo.instagram}
                onChange={handleInputChange}
                placeholder="Enter Instagram handle"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Telegram Handle */}
            <div>
              <label>Telegram Handle</label>
              <input
                type="text"
                name="telegram"
                value={mechanicInfo.telegram}
                onChange={handleInputChange}
                placeholder="Enter Telegram handle"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div>
              <label>Year of experience</label>
              <input
                type="text"
                name="experience"
                value={mechanicInfo.experience}
                onChange={handleInputChange}
                placeholder="Enter Telegram handle"
                className="w-full p-3 border border-gray-300 rounded-md mt-2"
              />
            </div>

            {/* Branches Selection */}
            <div>
              <label>Select Branches</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {branchOptions.map((branch) => (
                  <label key={branch} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="branches"
                      value={branch}
                      checked={mechanicInfo.branches.includes(branch)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{branch}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Opening Days Selection */}
            <div>
              <label>Select Opening Days</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {openingDaysOptions.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="openingDays"
                      value={day}
                      checked={mechanicInfo.openingDays.includes(day)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <label>Select Services Offered</label>
              <div className="flex flex-wrap gap-6 mt-2">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={mechanicInfo.services.includes(service)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="flex flex-col gap-2 pt-4">
          <input
            disabled={isLoading}
            type="submit"
            value={"ADD USER"}
            className="btn__bg px-6 py-2 bg-blue-500 uppercase rounded-md text-white disabled:bg-white hover:bg-sky-700 active:bg-violet-700"
          />
        </div>
        <Toaster position="top-center" />
      </form>
    </article>
  );
}

export default AdminForm;
