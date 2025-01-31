import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';

export let CartContext =createContext();

export default function CartContextProvider({children}){

  const[cart,setCart]=useState(null)

  const headers={
    token: localStorage.getItem('userToken')
  }

  async function addProductToCart(productId){
    try{
     let{data} =await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId
      },{
        headers
      })
      console.log(data)
      setCart(data)
      toast.success(data.message)
    }catch (error){

    }

  }
  return <CartContext.Provider value={{addProductToCart , cart}}>
    {children}
  </CartContext.Provider>
}