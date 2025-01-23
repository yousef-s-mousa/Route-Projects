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

const routers = createHashRouter([{
  path: '/' , element: <Layout/>, children:[
    {index: true, element: <Register/> },
    {path:'home', element:<Home/>},
    {path:'cart', element:<Cart/>},
    {path:'categories', element:<Categories/>},
    {path:'brands', element:<Brands/>},
    {path:'products', element:<Products/>},
    {path:'login', element:<Login/>},
    {path:'*', element:<Notfound/>},
   ]
}])

function App() {
   
  return<>
   <RouterProvider router={routers}></RouterProvider>
    </>
 
}

export default App
