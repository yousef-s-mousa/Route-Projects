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

         var settings = {
            dots: false,
            infinite: true,
            speed: 2000,
            slidesToShow: 6,
            slidesToScroll: 6,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: true,
                  dots: false
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
 return (
    <>
      <Slider {...settings}>
        {data?.data.data.map((cata) => {
          return (
            <div key={cata._id} className="my-6">
              <img src={cata.image} className="h-48 w-full object-cover object-center" alt="" />
              <h5 className="text-center font-bold text-gray-700">{cata.name}</h5>
            </div>
          );
        })}
      </Slider>
    </>
  );
  }
