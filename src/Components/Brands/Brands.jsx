import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Loader/Loader";

export default function BrandCarousels() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/`);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
  });



  const brands = data?.data.data || [];
  const chunkSize = 10;
  const carousels = Array.from({ length: 4 }, (_, i) =>
    brands.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return <>
{isLoading ? <Loader/> :     <div className="container mx-auto px-4">
  <h2 className="text-xl font-bold mb-4 text-[#726EEB] uppercase">our brands </h2>
  {carousels.map((carousel, index) => {

    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 900,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      autoplaySpeed: 1500,
      autoplay:true,
      rtl: index % 2 !== 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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
      <div key={index} className="my-6">
        <Slider {...sliderSettings}>
          {carousel.map((brand) => (
            <div
              key={brand._id}
              className="p-4 border rounded-lg border-[#726EEB] shadow-xl flex flex-col items-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-32 h-32 object-contain"
              />
              <p className="mt-2 font-bold text-center text-[#726EEB]">{brand.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  })}
</div>}
</>;
}
