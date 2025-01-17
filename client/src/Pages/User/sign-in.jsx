import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}auth/login`,
                userData
            );

            toast.success("Login Successfully");

            if (response?.data?.role === "organization") {
                navigate("/orghome");
                localStorage.setItem("organization_data", JSON.stringify(response?.data));
            } else if (response?.data?.role === "mechanic") {
                navigate("/mechanicprofile");
                localStorage.setItem("mechanic_data", JSON.stringify(response?.data));
            } else if (response?.data?.role === "admin") {
                navigate("/adminhome");
                localStorage.setItem("admin_data", JSON.stringify(response?.data));
            } else {
                navigate("/");
                localStorage.setItem("users_data", JSON.stringify(response?.data));
            }

            toast.success("Login Successfully");
        } catch (error) {
            if (error?.response?.status === 400 || error?.response?.status === 409) {
                toast.error("Invalid username or password");
            } else {
                toast.error("An error occurred during login");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <article className="w-full h-[70vh] flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 p-8 bg-white"
                >
                    <p className="text-center font-bold text-lg uppercase">Sign In</p>

                    <div>
                        <label>Username</label>
                        <input
                            {...register("username")}
                            className="border text-sm w-full bg-slate-100 rounded-md p-1.5"
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <div className="flex justify-between border text-sm w-full bg-slate-100 rounded-md p-1.5 pe-4">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                className="bg-transparent outline-none focus:outline-none focus:border-none"
                            />
                            {showPassword ? (
                                <FaEye
                                    size={16}
                                    onClick={() => setShowPassword(false)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <FaEyeSlash
                                    size={16}
                                    onClick={() => setShowPassword(true)}
                                    className="cursor-pointer"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        <input
                            disabled={isLoading}
                            type="submit"
                            value={"Login"}
                            className="btn__bg px-6 py-1 bg-blue-500 uppercase rounded-md text-orangered-500 disabled:bg-white hover:bg-sky-700 active:bg-violet-700"
                        />

                        <p>
                            Have no account?{" "}
                            <Link to={"/signUp"} className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    <Toaster position="top-center" />
                </form>
            </article>
        </>
    );
};

export default SignIn;

