import React, { useContext } from 'react'
import { AdressContext } from '../../Context/AddressContext'
import { useFormik } from 'formik'

export default function Adress() {

const{isEditing, setIsEditing,addAdress ,isLoading }=useContext(AdressContext)



const formik = useFormik({
   initialValues:{
    name:'',
    details:'',
    city:'',
    phone:''
   },
   onSubmit: (values) => addAdress(values),
  })

 
  return <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative h-auto">
    <button onClick={()=>setIsEditing(false)} type="button"className="absolute top-2 right-2  hover:text-red-900 font-bold text-red-500  text-xl">✕</button>
    <h2 className="text-xl font-semibold mb-4">Edit Your Details</h2>
    <input
      type="text"
      name='name'
      id='name'
      placeholder="Name"
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <input
      required
      type="text"
      name='details'
      id='details'
      placeholder="Details"
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <input
      required
      type="text"
      name='city'
      id='city'
      placeholder="City"
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <input
      required
      type="tel"
      name='phone'
      id='phone'
      placeholder="Phone"
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  <button type="submit"className="w-full bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700">Save </button>
  </form>
 </div>
    </>
  
}
