import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/adidas.jpg'
import img2 from '../../assets/non.jpg'
import img3 from '../../assets/banner-4.jpeg'
export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay:true,
  };
  return <>
   <div className="flex">
    <div className="w-full">
    <Slider {...settings}>
      <div className="relative"> 
      <button type="button" className="absolute bottom-1/4 left-20 text-white  bg-[#268FD3] border border-[#268FD3]  hover:bg-transparent   font-bold rounded-full text-sm px-12 py-3  ">Shop Now</button>
      <img className="w-full h-[400px]  object-fit  " src={img1} alt="food" />
      </div>
      <div className="relative">
      <button type="button" className="absolute bottom-1/4 left-1/2  text-white  bg-[#00FC8F] border border-[#00FC8F]  hover:bg-transparent   font-bold rounded-full text-sm px-12 py-3  ">Shop Now</button>
      <img className="w-full h-[400px] object-fit  " src={img2} alt="food" />
      </div>
      <div className="relative"> 
      <button type="button" className="absolute bottom-1/2 left-1/4  text-white  bg-[#B0A690] border border-[#B0A690]  hover:bg-transparent   font-bold rounded-full text-sm px-12 py-3  ">Shop Now</button>
        <img className="w-full  h-[400px] object-fit" src={img3} alt="food" />
      </div>
    </Slider>
    </div>
   </div>
  </>
}