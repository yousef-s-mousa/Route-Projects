import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay:true,
  };
  return (
   <div className="flex">
    <div className="w-9/12">
    <Slider {...settings}>
      <div>
      <img className="w-full h-96 object-cover" src={img1} alt="food" />
      </div>
      <div>
      <img className="w-full  h-96 object-cover" src={img2} alt="food" />
      </div>
      <div>
        <img className="w-full  h-96 object-cover" src={img3} alt="food" />
      </div>
    </Slider>
    </div>
    <div className="w-3/12">
    <div><img src={img2} className="w-full h-48" alt="food" /></div>
    <div><img src={img3} className="w-full h-48" alt="food" /></div>
    </div>
   </div>
  );
}