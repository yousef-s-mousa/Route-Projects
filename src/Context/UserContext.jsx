import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";





 export let Usercontext = createContext();

export default function UserContextProvider({children}){

   const [userToken ,setUserToken]=useState(null)
   const [userName , setUserName]=useState(null)

   useEffect(()=>{
    if (localStorage.getItem('userToken')){
        setUserToken(localStorage.getItem('userToken'))
    }
   })

  
   useEffect(() => {
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUserName(decoded.name); 
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [userToken]);
    return <Usercontext.Provider value={{userToken ,setUserToken,userName}}>
        {children}
    </Usercontext.Provider>
}