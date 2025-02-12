import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Usercontext } from './UserContext';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(Usercontext);
  const queryClient = useQueryClient();

  async function getCart() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: { token: userToken } });
    return data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['CartProducts'],
    queryFn: getCart,
    enabled: !!userToken, // Only fetch when token exists
  });

  async function addProductToCart(productId) {
    try {
      if (!userToken) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: { token: userToken } }
      );

      queryClient.invalidateQueries(['CartProducts']);
      toast.success(data.message || 'Product added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  async function updateCartCount(productId, count) {
    try {
      if (!userToken) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: userToken } }
      );

      queryClient.invalidateQueries(['CartProducts']);
      toast.success(data.message || 'Cart updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  async function deleteCartItem(productId) {
    try {
      if (!userToken) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token: userToken } }
      );

      queryClient.invalidateQueries(['CartProducts']);
      toast.success(data.message || 'Item Deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <CartContext.Provider value={{ addProductToCart, updateCartCount, deleteCartItem, data, isLoading, isError, error }}>
      {children}
    </CartContext.Provider>
  );
}
