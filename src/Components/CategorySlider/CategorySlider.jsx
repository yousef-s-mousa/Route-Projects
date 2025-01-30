import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";

export default function CategorySlider() {

    function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories?`)
         }
         let {data , isLoading , isFetched , isError,error} =useQuery({
          queryKey: ['allCategories'],
          queryFn: getAllCategories,
         })
 return (
    <>
      <Slider slidesToShow={6} slidesToScroll={6} arrows:false>
        {data?.data.data.map((cata) => {
          return (
            <div key={cata._id} className="my-6">
              <img src={cata.image} className="h-48 w-full object-cover object-top" alt="" />
              <h5 className="text-center text-gray-700">{cata.name}</h5>
            </div>
          );
        })}
      </Slider>
    </>
  );
}