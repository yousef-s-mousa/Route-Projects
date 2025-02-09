import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import axios from 'axios';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
export default function CheckOut() {
  const { data } = useContext(CartContext);
  const token = localStorage.getItem('userToken');
  const [paymentMethod, setPaymentMethod] = useState('visa'); 
  const navigate = useNavigate();

  function checkOutCart(shippingAddress, method, visaUrl = "https://yousef-s-mousa.github.io/Route-Projects/#") {
    const baseUrl = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${data?.data?.cartId}`;

    const params = method === 'visa' ? { url: visaUrl } : {};

    return axios.post(
      baseUrl,
      { shippingAddress },
      { 
        headers: { token }, 
        params: params 
      }
    );
}

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ shippingAddress, method }) => checkOutCart(shippingAddress, method),
    onSuccess: (response, { method }) => {
      if (method === 'visa') {
        window.location.href = response.data.session.url; 
      } else {
        toast.success('Order placed successfully Pay with cash upon delivery.');
        setTimeout(() => {
          navigate('/allorders');
        }, 2000);
        console.log(data)
      }
    },
    onError: (error) => {
      toast.error(`Checkout Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: (values) => {
      mutate({ shippingAddress: values, method: paymentMethod });
    }
  });

  return (
    <>
      {isLoading ? <Loader /> : 
        <section className='flex justify-center items-center my-32'>
          <div className="font-[sans-serif] p-4">
            <div className="md:max-w-5xl max-w-xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 max-md:order-1">
                  <h2 className="text-3xl font-extrabold text-gray-800">Make a payment</h2>
                  <p className="text-gray-800 text-sm mt-4">
                    Complete your transaction swiftly and securely with our easy-to-use payment process.
                  </p>
                  <form onSubmit={formik.handleSubmit} className="max-w-lg">
                    <div className="grid gap-4 w-full">
                      <div>
                        <input required type="text" placeholder="Details" id="details" name="details"
                          value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-[#4F46E5] focus:bg-transparent outline-none" />
                      </div>

                      <div>
                        <input required type="text" placeholder="City" id="city" name="city"
                          value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-[#4F46E5] focus:bg-transparent outline-none" />
                      </div>

                      <div className="flex bg-gray-100 border rounded-md focus-within:border-[#4F46E5] focus-within:bg-transparent overflow-hidden">
                        <input required type="tel" placeholder="Phone" id="phone" name="phone"
                          value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                          className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent" />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button type="submit" onClick={() => setPaymentMethod('visa')}
                        className="w-40 py-3.5 text-sm border border-indigo-600 bg-[#4F46E5] text-white rounded-md hover:bg-white hover:text-[#4F46E5] tracking-wide">
                        Pay with Visa
                      </button>

                      <button type="submit" onClick={() => setPaymentMethod('cash')}
                        className="w-40 py-3.5 text-sm border border-green-600 bg-green-500 text-white rounded-md hover:bg-white hover:text-green-600 tracking-wide">
                        Pay with Cash
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-gray-100 p-6 rounded-md">
                  <h2 className="text-3xl font-bold text-gray-800">{data?.data.data.totalCartPrice} EGP</h2>
                  <ul className="text-gray-800 mt-8 space-y-3">
                    <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$0</span></li>
                    <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                      Total <span className="ml-auto">{data?.data.data.totalCartPrice} EGP</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}
