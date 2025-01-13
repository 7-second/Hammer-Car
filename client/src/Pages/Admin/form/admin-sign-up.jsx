import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AdminForm() {

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch role change for conditional validation
  const role = watch("role");

  const onSubmit = async (userData) => {
    console.log("Form Data:", userData); // Add this log to check the data being sent
  
    try {
      setIsLoading(true);
  
      // Ensure userData contains organizationId and other necessary fields
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/register`, 
        userData
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
