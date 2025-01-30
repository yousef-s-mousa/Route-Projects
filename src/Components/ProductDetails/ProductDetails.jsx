import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import { CartContext } from '../CartContext/CartContext'

export default function ProductDetails() {
 let {id}= useParams();
 let {addProductToCart} =useContext(CartContext)
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
    dots:true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return <>
  {isLoading? <Loader/>:
    <div className='w-10/12 mx-auto my-6'>
      <div  className='flex justify-between items-center gap-3'>
        <div className='w-4/12 '>
        <Slider {...settings}>
          {data.data.data.images.map((image)=>{
        return <img key={id} className='w-full' src={image} alt="" />
       })}
        </Slider>
        </div>
        <div className='w-8/12'>
         <h2 className='text-3xl my-6'>{data.data.data.title}</h2>
         <p className='text-gray-500 my-6'>{data.data.data.description}</p>
         <span>{data.data.data.category.name}</span>
         <div className='flex justify-between my-6'>
         <span className='text-xl' >{data.data.data.price}EGP</span>
         <span className='text-xl'><i className='fa-solid fa-star text-yellow-300'></i>{data.data.data.ratingsAverage}</span>
         </div>
         <button onClick={()=> addProductToCart(data.data.data.id)} className='btn bg-[#4F46E5] my-6 w-full p-1 rounded text-[#F9FBF2] hover:bg-[#726EEB]'> add to cart</button>
        </div>
      </div>
      </div>}
    </>
  
}
