import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function ForgotPassword() {


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  let navigate=useNavigate();


  async function PassReset(values) {
    setIsLoading(true)
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values );
       
      setSuccessMessage(data.message)
      setErrorMessage('')

      setTimeout(() => {
        navigate('/verifycode');
      }, 1000);

    } catch (error) {
      setErrorMessage(error.response.data.message|| 'Something went wrong')
      setSuccessMessage('')
    }
    finally{
      setIsLoading(false)
    }
  }
  
 

const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: PassReset,
  });


  return <>
<section className="bg-[#d7f9ff]">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 " >
    <div className="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8 bg-white" >
      <Link to={'/login'} className='text-[#4F46E5] hover:text-[#766FF2]'> <i className='fa fa-arrow-alt-circle-left'></i>  back to login </Link>
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-center mt-4">
        Change Password
      </h2>
      {successMessage && <div className='text-green-500 text-sm bg-green-100 rounded-lg mt-3 p-2 text-center'>{successMessage}</div>}
      {errorMessage && <div className='text-red-500 text-sm bg-red-100 rounded-lg mt-3 p-2 text-center'>{errorMessage}</div>}
      <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5 h-auto bg-transparent my-20" action="#">
        <div className='w-full'>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Enter Your Email" required />
        </div>
        
        <div className="flex items-start">
        </div>
        <button 
                type="submit" 
                className="w-full text-white bg-[#4F46E5] hover:bg-[#766FF2] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                disabled={isLoading} // Disable while loading
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>Loading...</span>) : ("Reset Password")}
              </button>      </form>
    </div>
  </div>
</section>



    </>
  
}
