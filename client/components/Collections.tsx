import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EastIcon from "@mui/icons-material/East";
import Smooth from "../utils/smooth";
import ProductListCard from "./ProductListCard";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import LeftArrow from "../utils/LeftArrow";
import RightArrow from "../utils/RightArrow";
import Button3 from "../utils/Button3";

const Collections = () => {
  const categories = useSelector((state) => state.auth.categories);
  const collections = useSelector((state) => state.auth.collections);
  console.log(collections);
  const products = useSelector((state) => state.auth.products);
  const selectedCategory = useSelector((state) => state.auth.selectedCategory);
  const [filterCollection, setFilterCollection] = useState([]);
  useEffect(() => {
    if (selectedCategory) {
      setFilterCollection(
        collections.filter((collection) => {
          return collection.category == selectedCategory.title;
        })
      );
    } else {
      setFilterCollection(collections);
    }
  }, [filterCollection, collections, selectedCategory]);

  const [num, setNum] = useState(0);

  const data = [
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS39S23P55R4107-BARW_1200x.jpg?v=1683532300",
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS31S23P62S2102-AFLATLAY_500x.jpg?v=1677615012",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS31S23P55R4105-B_1200x.jpg?v=1683532277",
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS39S23P62S2103_500x.jpg?v=1680599113",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-SRVC-WHNS39S23P62S2103-B_1200x.jpg?v=1683534221",
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS31S23P55R4105-Aflatlay_500x.jpg?v=1683532277",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS31S23P62S2102-B_1200x.jpg?v=1677616443",
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS39S23P55R4107-Aflatlay_500x.jpg?v=1683532300",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS39S23P55R4107-BARW_1200x.jpg?v=1683532300",
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS31S23P62S2102-AFLATLAY_500x.jpg?v=1677615012",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS31S23P55R4105-B_1200x.jpg?v=1683532277",
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS39S23P62S2103_500x.jpg?v=1680599113",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-SRVC-WHNS39S23P62S2103-B_1200x.jpg?v=1683534221",
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS31S23P55R4105-Aflatlay_500x.jpg?v=1683532277",
    ],
    [
      "https://fabricofsociety.luxury/cdn/shop/products/FOS-SRVC-WHNS31S23P62S2102-B_1200x.jpg?v=1677616443",
      "https://fabricofsociety.luxury/cdn/shop/files/FOS-ARI-WSWS39S23P55R4107-Aflatlay_500x.jpg?v=1683532300",
    ],
  ];

  return (
    <Smooth className=" flex flex-col gap-10 bg-[#fafafa] py-10">
      <div className="w-[100%] flex flex-col gap-14">
        {[0]?.map((collection, index) => (
          <div
            key={collection._id}
            className=" flex flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-0 p-6">
              <p className=" uppercase text-2xl cursor-default font-monumentRegular">
                New In
              </p>
              <div>All new in Shremz this week</div>
            </div>
            <div className="w-[100%]">
              <div className=" relative overflow-hidden w-screen">
                <div
                  className={`md:flex grid grid-cols-2 gap-y-4 md:grid-cols-none  md:gap-[2vw] transition-all duration-500 w-screen justify-center`}
                  style={{ transform: `translateX(calc(-25vw * ${num}))` }}
                >
                  {data.map((product, i) => (
                    <ProductListCard product={product} key={i} />
                  ))}
                </div>
                <div className=" absolute top-1/2 scale-150 left-10 -translate-y-1/2">
                  <LeftArrow max={4} num={num} setNum={setNum} />
                </div>
                <div className=" absolute top-1/2 scale-150 right-10 -translate-y-1/2">
                  <RightArrow max={4} num={num} setNum={setNum} />
                </div>
              </div>
            </div>
            <button
              className={`w-[170px] bg-[#1e4732] text-white h-[50px] px-10 py-4 flex items-center justify-center gap-10 relative group `}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </Smooth>
  );
};

export default Collections;
