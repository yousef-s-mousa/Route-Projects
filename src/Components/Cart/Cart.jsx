import React, { useContext, useEffect } from 'react'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext';

export default function Cart() {

  const { error,data, isLoading, isError , getCart, updateCartCount ,deleteCartItem} = useContext(CartContext);

  const{addProductToWishList}=useContext(WishlistContext)
   
  return <>
{isLoading ? (
  <Loader />
) : isError ? (
  <p className="text-red-500 text-center">{error?.message || "An unexpected error occurred"}</p>
) : data?.numOfCartItems > 0? <section className="bg-white py-8 antialiased  md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-[#726EEB] sm:text-2xl">Shopping Cart</h2>
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
        {data?.data.products.map((item) =>   <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm   md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <Link to={`/productsdetails/${item.product.id}`} className="shrink-0 md:order-1">
                <img className="h-20 w-20 " src={item.product.imageCover} alt={item.product.title} />
              </Link>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button onClick={item.count >1? ()=>updateCartCount(item.product.id , item.count-1) : ()=>deleteCartItem(item.product.id)} type="button" id="decrement-button-2" data-input-counter-decrement="counter-input-2" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100    ">
                    <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <span className='px-2'>{item.count}</span>
                  <button onClick={()=>updateCartCount(item.product.id , item.count+1)} type="button" id="increment-button-2" data-input-counter-increment="counter-input-2" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100    ">
                    <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 ">{item.price * item.count} EGP</p>
                </div>
              </div>
              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <Link to={`/productsdetails/${item.product.id}`}> <button onClick={()=> addProductToCart(product.id)} className="text-base font-medium text-gray-900 hover:underline ">{item.product.title}</button></Link>
                <div className="flex items-center gap-4">
                  <button onClick={()=>addProductToWishList(item.product.id)} type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline  ">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Wishlist
                  </button>
                  <button onClick={()=>deleteCartItem(item.product.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline ">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////// */}
      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
          <p className="text-xl font-semibold text-[#726EEB] ">Order summary</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">Original price</dt>
                <dd className="text-base font-medium text-gray-900 ">{data?.data.totalCartPrice} EGP</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">Tax</dt>
                <dd className="text-base font-medium text-gray-900 ">$0</dd>
              </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
              <dt className="text-base font-bold text-gray-900 ">Total</dt>
              <dd className="text-base font-bold text-gray-900 ">{data?.data.totalCartPrice} EGP</dd>
            </dl>
          </div>
          <Link to={'/checkout'} className="flex w-full items-center justify-center rounded-lg bg-[#726EEB] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 ">Proceed to Checkout</Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 "> or </span>
            <Link to={'/'} className="inline-flex items-center gap-2 text-sm font-medium text-[#726EEB] underline hover:no-underline">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> :
// ////////////////////////////////////////////////////////////////////////////////
 <div className='justify-center flex-col flex items-center p-20'>
<i className='fa fa-cart-shopping text-[#726EEB] text-9xl'></i>
<h2 className='font-bold text-xl my-2'>Your cart is empty</h2>
<p className='text-gray-700 text-center'>Add products while you shop, so they'll be ready for checkout later.</p>
<Link to={'/products'}><button className='my-2 p-2 bg-[#4F46E5] hover:bg-[#726EEB] text-white rounded-lg'>Start shopping</button></Link>
</div>
  }
  


    </>
  
}
