import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Redirect user after success
  let{setUserToken}=useContext(Usercontext)

  async function handleReset(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      setSuccessMessage("Password reset successful! Redirecting...");
      setErrorMessage("");
     
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleReset,
  });

  return (
    <section className="bg-[#d7f9ff]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full p-6 rounded-lg py-10 shadow border sm:max-w-md sm:px-8 bg-white h-auto">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Reset Your Password
          </h2>

          {successMessage && (
            <div className="text-green-500 text-sm bg-green-100 rounded-lg mt-3 p-2 text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-sm bg-red-100 rounded-lg mt-3 p-2 text-center">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className=" space-y-4  md:space-y-5 bg-transparent"
          >
            {/* Email Field */}
            <div className="w-full">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                name="email"
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
                placeholder="Enter Your Email"
                required
              />
            </div>

            {/* New Password Field */}
            <div className="w-full">
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
                New Password
              </label>
              <input
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                type="password"
                name="newPassword"
                className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
                placeholder="Enter New Password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-[#4F46E5] hover:bg-[#766FF2] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                  Processing...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
