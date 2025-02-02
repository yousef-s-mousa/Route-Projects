import React, { useContext, useState ,useEffect } from 'react'
import { Usercontext } from '../../Context/UserContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import { CartContext } from '../CartContext/CartContext'
// //////////////////////////////////////////////// API DATA///////////////////////////////
export default function Home() {
  const [numsPages,setNumOfPages]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  let {addProductToCart}=useContext(CartContext)
 function getAllProducts(page){
return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=18&page=${page}`)
 }
 let {data , isLoading , isFetched , isError,error,refetch } =useQuery({
  queryKey: ['allProducts', currentPage],
  queryFn: () => getAllProducts(currentPage),
  keepPreviousData: true,
 });
 useEffect(() => {
  refetch(); 
}, [currentPage, refetch]);
//  ///////////////////////////////// get pages number////////////////////////////////
  useEffect(() => {
    if (data?.data?.metadata?.numberOfPages) {
      const nums = [];
      for (let i = 1; i <= data.data.metadata.numberOfPages; i++) {
        nums.push(i);
      }
      setNumOfPages(nums);
    }
  }, [data]);
  function getPageNumber(e) {
    let page = parseInt(e.target.getAttribute('page'), 10);
    if (!isNaN(page)) {
      setCurrentPage(page);
    }
  }
// //////////////////////////////////////// DATA SHOW//////////////////////////////////////////////
  return <>
   {isLoading && <Loader />}

   {isError && (
    <div className="text-red-500 text-center text-xl font-semibold m-96">
    ❌ An error occurred : {error.message}
   </div>
    )}

   {!isLoading && !isError && (
   <div className=' w-10/12 mx-auto my-6'>
         <MainSlider/>
         <CategorySlider/>
   <div className=' flex flex-wrap gap-y-4 mt-12'>
    {data?.data.data.map((product)=>{
      return  <div key={product.id} className=' lg:w-1/6 md:w-1/4 sm:w-full '>
       <div className='product p-4 px-5 rounded group '>
       <Link to={`/productsdetails/${product.id}`}>
       <img src={product.imageCover} alt={product.title} className='w-full' />
       <h3 className='text-main '>{product.category.name}</h3>
       <h2 className='text-2xl group-hover:text-[#726EEB]'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
       <div className='flex justify-between my-1'>
        <span>{product.price}EGP</span>
        <span><i className='fa-solid fa-star text-yellow-300'></i>{product.ratingsAverage}</span>
       </div></Link>
       <button onClick={()=> addProductToCart(product.id)} className='btn bg-[#4F46E5] w-full p-1 rounded text-[#F9FBF2] hover:bg-[#726EEB]'> add to cart</button>
      </div>
      </div>
    })}
   </div>
   {/* //////////////////////// PAGES/////////////////////////////////////////////////////// */}
   <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm justify-center mt-6">
    <li>
      <button  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-[#0E1C36] bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
        </svg>
      </button>
    </li>
    {numsPages?.map((pn) => (
  <li key={pn} onClick={getPageNumber}>
    <button
      page={pn}
      className={`flex items-center justify-center px-3 h-8 leading-tight text-[#0E1C36] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
        currentPage === pn ? 'bg-gray-500 text-white' : ''
      }`}
    >
      {pn}
    </button>
  </li>
))}
    <li>
      <button  className="flex items-center justify-center px-3 h-8 leading-tight text-[#0E1C36] bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() =>
    setCurrentPage((prev) => Math.min(prev + 1, numsPages.length))
  }>
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
        </svg>
      </button>
    </li>
  </ul>
</nav>
{/* ////////////////////////////////////////////////////////////////////////////// */}

 </div>
)
}
    </>

}