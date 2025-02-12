import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Usercontext } from './UserContext';

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishList, setWishList] = useState(null);
  const { userToken: token } = useContext(Usercontext);
  const queryClient = useQueryClient();

  async function addProductToWishList(productId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers: { token } }
      );

      queryClient.invalidateQueries(['WishListProducts']);
      toast.success(data.message || 'Product added successfully');
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////
  async function deleteWishListItem(productId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      setWishList(data);
      queryClient.invalidateQueries(['WishListProducts']);

      toast.success(data.message || 'Item Deleted', {
        duration: 1000,
      });
    } catch (error) {
      console.error('Error Deleting item:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////
  async function getWishList() {
    const token = localStorage.getItem('userToken');
    if (!token) throw new Error('No Token Found');

    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: { token },
    });

    return data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['WishListProducts'],
    queryFn: getWishList,
  });
////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <WishlistContext.Provider
      value={{ getWishList, addProductToWishList, data, isLoading, isError, deleteWishListItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
