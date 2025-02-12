import React, { useContext } from "react";
import { useFormik } from "formik";
import { UpdatePasswordContext } from "../../Context/UpdatePasswordContext";

export default function UpdatePassword() {
  const { passForm, setPassForm, UpdatePassword } = useContext(UpdatePasswordContext);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => UpdatePassword(values), 
  });

  return (
    <>
        {passForm&&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative h-auto">
            <button onClick={()=>setPassForm(false)}
              type="button"
              className="absolute top-2 right-2 hover:text-red-900 font-bold text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Your Password</h2>
            <input
              type="text"
              name="currentPassword"
              id="currentPassword"
              placeholder="CurrentPassword"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              required
              type="text"
              name="password"
              id="password"
              placeholder="NewPassword"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              required
              type="text"
              name="rePassword"
              id="rePassword"
              placeholder="RePassword"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button type="submit" className="w-full bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg hover:bg-[#726EEB]">
              Save
            </button>
          </form>
        </div>}
      
    </>
  );
}
