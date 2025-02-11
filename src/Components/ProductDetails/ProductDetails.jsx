import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import { CartContext } from '../CartContext/CartContext'
import { WishlistContext } from '../../Context/WishListContext'

export default function ProductDetails() {
 let {id}= useParams();
 let {addProductToCart} =useContext(CartContext)
 let {addProductToWishList} =useContext(WishlistContext)
 function getDetails(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   }
   let {data , isLoading , isFetched , isError,error} =useQuery({
    queryKey: ['Details', id],
    queryFn: getDetails,
   }) 
   var settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    dots:false,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return <>
  {isLoading? <Loader/>:
    <div className='w-10/12 mx-auto my-6'>
      <div  className='flex flex-col md:flex-row justify-between items-center gap-3'>
        <div className='w-full md:w-4/12 '>
        <Slider {...settings}>
          {data.data.data.images.map((image)=>{
        return <img key={id} className='w-full' src={image} alt="" />
       })}
        </Slider>
        </div>
        <div className='w-full md:w-8/12 text-center md:text-left'>
         <div className='flex items-center '>
         <h2 className='text-3xl my-6 me-3'>{data.data.data.title}</h2>
         <button onClick={()=> addProductToWishList(data.data.data.id)} className='rounded-full h-6 w-6 bg-white border border-red-500 flex justify-center items-center group/love hover:bg-red-500'>
         <i className='fa fa-heart text-red-500 text-sm  group-hover/love:text-white'></i></button>
         </div>
         <p className='text-gray-500 my-6'>{data.data.data.description}</p>
         <span>{data.data.data.category.name}</span>
         <div className='flex justify-between my-6'>
         <span className='text-xl' >{data.data.data.price}EGP</span>
         <span className='text-xl'><i className='fa-solid fa-star text-yellow-300'></i>{data.data.data.ratingsAverage}</span>
         </div>
        <div className='flex justify-center'> <button onClick={()=> addProductToCart(data.data.data.id)} className='btn bg-[#4F46E5] my-6 w-full md:w-10/12 p-1 rounded text-[#F9FBF2] hover:bg-[#726EEB]'> add to cart</button></div>
        </div>
      </div>
      </div>}
    </>
  
}
