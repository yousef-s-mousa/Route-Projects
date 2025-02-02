import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  const headers = {
    token: localStorage.getItem('userToken') || '',
  };

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers }
      );
      setCart(data.data); // Ensure the correct data is stored
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <CartContext.Provider value={{ addProductToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
}
