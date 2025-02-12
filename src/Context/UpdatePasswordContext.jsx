import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "./UserContext";

export const UpdatePasswordContext = createContext();
export default function UpdatePasswordContextProvider({ children }) {
  const [passForm, setPassForm] = useState(false);

  
  async function UpdatePassword(values) {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          toast.error("No Token Found");
          return;
        }
      
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
          values,
          { headers: { token } }
        );

        toast.success("Password updated successfully. please Login Again.");
        setPassForm(false);  
        
        return data; 
        
      } catch (error) {
        toast.error(error.response?.data?.errors?.msg || "Something went wrong");
        
      }
    }      

  return (
    <UpdatePasswordContext.Provider value={{passForm, setPassForm, UpdatePassword }}>
      {children}
    </UpdatePasswordContext.Provider>
  );
}
