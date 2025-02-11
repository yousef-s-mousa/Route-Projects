import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient , useQuery } from '@tanstack/react-query';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const queryClient = useQueryClient();
  const token = localStorage.getItem('userToken')




  function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {headers:{token}});
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['CartProducts'],
    queryFn: getCart,
  });

 

  async function addProductToCart(productId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: { token } }
      );
      queryClient.invalidateQueries(['CartProducts']);
      toast.success(data.message || 'Product added successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }



  async function updateCartCount(productId, count) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }
  
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token } }
      );
  
      setCart(data);
  
      queryClient.invalidateQueries(['CartProducts']);
  
      toast.success(data.message || 'Cart updated successfully', {
        duration: 1000,
      });
    } catch (error) {
      console.error('Error changing count:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }


  async function deleteCartItem(productId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }
  
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: { token } }
      );
  
      setCart(data);
  
      queryClient.invalidateQueries(['CartProducts']);
  
      toast.success(data.message || 'Item Deleted ', {
        duration: 1000,
      });
    } catch (error) {
      console.error('Error Deleting item:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);
   


  return (
    <CartContext.Provider value={{ addProductToCart , error, getCart, data, isLoading, isError,updateCartCount , deleteCartItem}}>
      {children}
    </CartContext.Provider>
  );
}
