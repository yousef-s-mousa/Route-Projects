import './App.css'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Register from './Components/Register/Register.jsx'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Components/CartContext/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import WishList from './Components/WishList/WishList.jsx'
import WishlistContextProvider from './Context/WishListContext.jsx'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx'
import VerifyCode from './Components/verifyCode/verifyCode.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'

const routers = createHashRouter([{
  path: '/' , element: <Layout/>, children:[
    {path: 'login', element: <Register/> },
    {path:'*', element:<Notfound/>},
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productsdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'checkout', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'wishlist', element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'forgotpassword', element:<ForgotPassword/>},
    {path:'verifycode', element:<VerifyCode/>},
    {path:'resetpassword', element:<ResetPassword/>},
   
   ]
}])
const query= new QueryClient()

function App() {
   
  return<>
   <QueryClientProvider client={query}>
   <CartContextProvider>
   <WishlistContextProvider>
   <UserContextProvider>
   <RouterProvider router={routers}></RouterProvider>
   <Toaster/>
   </UserContextProvider>
   </WishlistContextProvider>
   </CartContextProvider>
   </QueryClientProvider>
   
    </>
 
}

export default App
