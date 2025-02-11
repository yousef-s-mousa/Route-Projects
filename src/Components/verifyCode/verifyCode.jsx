import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  async function VerifyResetCode(values) {
    setIsLoading(true);
    console.log(values);
    
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode: values.resetCode});

      setSuccessMessage('Code verified successfully! Redirecting...');
      setErrorMessage('');
            
      setTimeout(() => {
        navigate('/resetpassword');
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid code');
      setSuccessMessage('');
      
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues:{
      resetCode:""
  },
    onSubmit: VerifyResetCode,
  });

  return (
    <section className="bg-[#d7f9ff] h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow border bg-white">
      <Link to={'/forgotpassword'} className='text-[#4F46E5] hover:text-[#766FF2] capitalize'> <i className='fa fa-arrow-alt-circle-left'></i>  back to email ? </Link>
        <h2 className="mb-1 mt-4 text-xl font-bold text-black">Verify Reset Code</h2>

        {successMessage && <div className="text-green-500 bg-green-100 p-2 rounded-lg mt-3 text-center">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 bg-red-100 p-2 rounded-lg mt-3 text-center">{errorMessage}</div>}

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="resetCode" className="block text-sm font-medium text-gray-900">Enter Verification Code</label>
            <input
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              type="text"
              name="resetCode"
              id="resetCode"
              className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="Enter Code"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full text-white bg-[#4F46E5] hover:bg-[#766FF2] font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>Verifying...
              </span>
            ) : ("Verify Code")}
          </button>
        </form>
      </div>
    </section>
  );
}
