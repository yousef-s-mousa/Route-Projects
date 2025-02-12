import React, { useContext } from "react";
import { useFormik } from "formik";
import { EmailContext } from "../../Context/EmailContext"; // Import EmailContext

export default function UserData() {
  const { updateForm, setUpdateForm, UpdateUserData } = useContext(EmailContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => UpdateUserData(values), 
  });

  return (
    <>
      {updateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative h-auto">
            <button
              onClick={() => setUpdateForm(false)}
              type="button"
              className="absolute top-2 right-2 hover:text-red-900 font-bold text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Your Details</h2>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              required
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button type="submit" className="w-full bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg hover:bg-[#726EEB]">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
