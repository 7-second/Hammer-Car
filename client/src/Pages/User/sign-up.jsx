import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (userData) => {
    try {
      setIsLoading(true);

      // Send the user data (no organizationId)
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/register`,
        userData // Send only email, username, password
      );

      toast.success("Registration successful!");
      if (response.status === 201) {
        navigate("/signIn"); // Redirect to sign-in page on success
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("User already exists. Please try logging in.");
        } else {
          toast.error("Registration Error. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="w-full h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 p-8 bg-white"
      >
        <p className="text-center font-bold text-lg uppercase">Registration</p>

        {/* Email Input */}
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Example@company.com"
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.email && <p className="pt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Username Input */}
        <div>
          <label>Username</label>
          <input
            {...register("username", {
              required: "Username is required"
            })}
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.username && <p className="pt-1 text-xs text-red-500">{errors.username.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label>Password</label>
          <input
            {...register("password", {
              required: "Password is required"
            })}
            type="password"
            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
          />
          {errors.password && <p className="pt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-2 pt-4">
          <input
            disabled={isLoading}
            type="submit"
            value="Sign Up"
            className="btn__bg px-6 py-1 bg-blue-500 uppercase rounded-md text-orangered-500 disabled:bg-white hover:bg-sky-700 active:bg-violet-700"
          />
          <p>
            Have an account?{" "}
            <Link to="/signIn" className="text-blue-500">Sign In</Link>
          </p>
        </div>

        <Toaster position="top-center" />
      </form>
    </article>
  );
}

export default SignUp;
