import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { CartContext } from '../CartContext/CartContext';
import { WishlistContext } from '../../Context/WishListContext';

export default function Products() {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList } = useContext(WishlistContext);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  function GetProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products?limit=100');
  }

  function GetCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['Products'],
    queryFn: GetProducts,
  });

  const { data: categoryData } = useQuery({
    queryKey: ['getCategories'],
    queryFn: GetCategories,
  });

  const categories = categoryData?.data?.data || [];

  let filteredProducts = data?.data?.data?.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.ratingsAverage >= minRating &&
      (selectedCategory ? product.category.name === selectedCategory : true)
  );

  // Apply sorting by price
  if (sortOrder === "lowToHigh") {
    filteredProducts = filteredProducts?.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts = filteredProducts?.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-4xl font-bold text-[#726EEB] capitalize my-3 ms-2">Our Products</h2>
          <div className="flex gap-2">
            {/* Filter Sidebar */}
            <div className="w-56 p-6 bg-gray-100 shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-[#4F46E5] mb-4">Filter Products</h3>

              {/* Price Filter */}
              <div className="mb-5 ">
                <label className="block text-gray-600 font-medium mb-1">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer "
                />
                <div className="flex justify-between text-gray-700 text-sm mt-2">
                  <span>0 EGP</span>
                  <span>{maxPrice} EGP</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-5">
                <label className="block text-gray-600 font-medium mb-1">Rating</label>
                <div className="flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="hidden peer"
                      />
                      <span className="w-4 h-4 border-2 border-gray-400 rounded-full peer-checked:bg-[#4F46E5] peer-checked:border-[#4F46E5] mr-2"></span>
                      <span className="text-gray-700">
                        {Array.from({ length: rating }, (_, i) => (
                          <i key={i} className="fa fa-star text-yellow-500 "></i>
                        ))}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-5">
                <label className="block text-gray-600 font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Filter */}
              <div className="mb-5">
                <label className="block text-gray-600 font-medium mb-1">Sort By Price</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Default</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(10000);
                  setMinRating(0);
                  setSelectedCategory("");
                  setSortOrder("");
                }}
                className="w-full px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-800 hover:text-white"
              >
                Reset
              </button>
            </div>

            {/* Product List */}
            <div className="flex flex-wrap gap-y-4 w-10/12 me-1">
              {filteredProducts?.map((product) => (
                <div key={product.id} className="lg:w-1/6 md:w-1/4 sm:w-full">
                  <div className="product p-4 px-5 rounded group">
                    <div className="relative">
                      <Link to={`/productsdetails/${product.id}`}>
                        <img src={product.imageCover} alt={product.title} className="w-full" />
                      </Link>
                      <button
                        onClick={() => addProductToWishList(product.id)}
                        className="rounded-full h-6 w-6 bg-transparent opacity-0 duration-300 group-hover:opacity-100 border border-red-500 flex justify-center items-center group/love hover:bg-red-500 absolute top-1 right-2 z-10"
                      >
                        <i className="fa fa-heart text-red-500 text-sm group-hover/love:text-white"></i>
                      </button>
                    </div>
                    <h3 className="text-main">{product.category.name}</h3>
                    <h2 className="text-2xl group-hover:text-[#726EEB]">
                      {product.title.split(' ').slice(0, 2).join(' ')}
                    </h2>
                    <div className="flex justify-between my-1">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fa-solid fa-star text-yellow-300"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn bg-[#4F46E5] w-full p-1 rounded text-[#F9FBF2] hover:bg-[#726EEB]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
