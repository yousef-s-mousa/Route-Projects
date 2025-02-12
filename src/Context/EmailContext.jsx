import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "./UserContext";

export const EmailContext = createContext();
export default function EmailContextProvider({ children }) {
  const [updateForm, setUpdateForm] = useState(false);
  async function UpdateUserData(values) {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          toast.error("No Token Found");
          return;
        }
      
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
          values,
          { headers: { token } }
        );

        toast.success("Data updated successfully. Please log in again to see the changes.");
        setUpdateForm(false);     
        return data;
      } catch (error) {
        toast.error(error.response?.data?.errors?.msg || "Something went wrong");
        console.log(error);
        
      }
    }      

  return (
    <EmailContext.Provider value={{ updateForm, setUpdateForm, UpdateUserData }}>
      {children}
    </EmailContext.Provider>
  );
}
