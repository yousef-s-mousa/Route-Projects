import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Categories from './Components/Categories/Categories'
import Register from './Components/Register/Register.jsx'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'

const routers = createHashRouter([{
  path: '/' , element: <Layout/>, children:[
    {index: true, element: <Register/> },
    {path:'login', element:<Login/>},
    {path:'*', element:<Notfound/>},
    {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
   
   ]
}])

function App() {
   
  return<>
   <UserContextProvider>
   <RouterProvider router={routers}></RouterProvider>
   </UserContextProvider>
    </>
 
}

export default App
