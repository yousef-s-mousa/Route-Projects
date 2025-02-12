import { createContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const AdressContext = createContext();



export default function AdressContextProvider({ children }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
 
 
 
 
  async function addAdress(values) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }

      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/addresses',
        values, 
        { headers: { token } }
      );
      setIsEditing(false)
      toast.success('Address added successfully');
      queryClient.invalidateQueries(['AddressList']); // Refresh addresses
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  async function deleteAdress(addressId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No Token Found');
        return;
      }

      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
        { headers: { token } }
      );

      toast.success('Address deleted successfully');
      queryClient.invalidateQueries(['AddressList']); // Refresh addresses after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      
    }
  }

  async function getAdress() {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('No Token Found');

      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/addresses',
        { headers: { token } }
      );

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['AddressList'],
    queryFn: getAdress,
  });

  return (
    <AdressContext.Provider value={{ getAdress, addAdress, deleteAdress, data, isLoading, isError,isEditing, setIsEditing }}>
      {children}
    </AdressContext.Provider>
  );
}
