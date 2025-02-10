import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import img from "../../assets/qq.png"; // Fallback image
import { Link } from "react-router-dom";

const fetchCategories = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  return data.data;
};

export default function Categories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="my-8 text-center">
      <h2 className="text-4xl font-bold text-[#726EEB] capitalize my-3">Our Categories</h2>
      {categories?.map((category) => (
        <SubCategorySlider key={category._id} category={category} />
      ))}
    </div>
  );
}

const fetchSubcategories = async (categoryId) => {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
  );
  return data.data;
};

function SubCategorySlider({ category }) {
  const { data: subcategories, isLoading } = useQuery({
    queryKey: ["subcategories", category._id],
    queryFn: () => fetchSubcategories(category._id),
  });

  if (isLoading) return <Loader />;
  if (!subcategories?.length) return null;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-6 text-center">
      <h3 className="text-2xl font-semibold text-main my-4">{category.name}</h3>
      <Slider {...sliderSettings} className="w-3/4 mx-auto">
        {subcategories.map((sub) => (
        <Link to={'notfound'} key={sub._id}>
            <div  className="p-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={sub.image || img}
                alt={sub.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="mt-2 text-lg font-medium">{sub.name}</p>
            </div>
          </div>
        </Link>
        ))}
      </Slider>
    </div>
  );
}
