import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { format } from "date-fns";
import { Link } from 'react-router-dom'


export default function AllOrders() {

  const token = localStorage.getItem('userToken')
  const decode= jwtDecode(token)
  const [showButton, setShowButton] = useState(false);

  function getOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decode.id}`)
  }
  let {data,isLoading,isError} =useQuery({
    queryKey: ['Orders', decode.id],
    queryFn: getOrders,
   });
/////////////////////////////////////////////
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return <>
{ isLoading? <Loader/>: <section className="py-24 relative">
  <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
    <h2 className="font-manrope font-extrabold text-3xl lead-10 text-[#726EEB] mb-9">Order History</h2>
    <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
      <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
        <li className="font-medium text-3xl leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
          All Orders</li>
      </ul>
    </div>
   {data?.data.slice().reverse().map((order)=>{ 
    return <div key={order.id} className="mt-7 border border-gray-300 pt-9">
      <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
        <div className="data">
          <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order placement at : {format(new Date(order.createdAt), 'EEEE, dd MMM yyyy')}</p>
        </div>
      </div>
      <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
        <path d="M0 1H1216" stroke="#D1D5DB" />
      </svg>
      {order.cartItems.map((item) => (
      <React.Fragment key={item._id}> 
        <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 ">
        <div className="grid grid-cols-4 w-full">
         <Link to={`/productsdetails/${item.product._id}`} className='col-span-4 sm:col-span-1'>
            <img src={item.product.imageCover} alt="asd" className="max-sm:mx-auto object-cover " /> </Link>
          <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap"> {item.product.title.split(' ').slice(0,2).join(' ')}</h6>
            <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: {item.product.brand.name}</p>
            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
              <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty:
                {item.count}</span>
              <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price {item.price * item.count}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap"> Status</p>
            <p className={`font-semibold text-lg leading-8 ${order.isDelivered ? 'text-green-500' : 'text-red-500'}  text-left whitespace-nowrap`}>
              {order.isDelivered ? "Delivered" : "Not deliverd yet"}</p>
          </div>
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
            Payment method</p>
            <p className="font-semibold text-lg leading-8 text-black whitespace-nowrap text-center">{order.paymentMethodType}</p>
          </div>
        </div>
        </div>
      <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
      <path d="M0 1H1216" stroke="#D1D5DB" />
    </svg>
    </React.Fragment>))}
       <svg className="mt-9 w-full" xmlns="http://www.w3.org/2000/svg" width={1216} height={2} viewBox="0 0 1216 2" fill="none">
        <path d="M0 1H1216" stroke="#D1D5DB" />
       </svg>
       <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
        <div className="flex max-sm:flex-col-reverse items-center py-5">
          <p className={`font-normal text-xl ${order.isPaid ? 'text-green-500' : 'text-red-500'} leading-8  sm:pl-8`}>{ order.isPaid ? 'Payment Is Succesfull' : 'Not Paid'}</p>
        </div>
        <p className="font-medium text-xl leading-8 text-black max-sm:py-4"> <span className="text-gray-500">Total
            Price: </span> {order.totalOrderPrice}</p>
       </div>
        </div>    
      })}
  </div>
</section>}
{showButton && (
        <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 p-1 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      )}

                                            
    </>
  
}
