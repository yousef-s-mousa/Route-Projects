import { createContext, useEffect, useState } from "react";





 export let Usercontext = createContext();

export default function UserContextProvider({children}){

   const [userToken ,setUserToken]=useState(null)

   useEffect(()=>{
    if (localStorage.getItem('userToken')){
        setUserToken(localStorage.getItem('userToken'))
    }
   })

    return <Usercontext.Provider value={{userToken ,setUserToken}}>
        {children}
    </Usercontext.Provider>
}