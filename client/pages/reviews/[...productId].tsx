import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CloseIcon from "@mui/icons-material/Close";
import WestIcon from "@mui/icons-material/West";
import Link from "next/link";

const ProductReviews = () => {
  const router = useRouter();
  const products = useSelector((state) => state.auth.products);
  const ratings = useSelector((state) => state.auth.ratings);
  const { productId } = router.query;
  const product = products?.filter((item) => {
    return item._id == productId;
  });
  const productRatings = ratings?.filter((rating) => {
    return rating.productId == productId;
  });
  const [selectedImages, setSelectedImages] = useState(null);
  const sumRating = productRatings?.reduce((acc, rating) => {
    return acc + rating.rating;
  }, 0);
  const ratingsAvg = sumRating / productRatings?.length;

  return (
    <div className=" min-h-screen mt-[6rem] relative flex px-10 gap-10">
      <div>
        <Link
          href={`/product/${productId}`}
          className=" flex h-fit items-center gap-1 hover:gap-4 transition-all duration-200"
        >
          <WestIcon />
          <p>Back to Home</p>
        </Link>
      </div>
      <div className="flex flex-col gap-6 w-fit ">
        <div>
          <p className=" text-lg flex items-center gap-2">
            Customer Reviews{" "}
            <span className=" text-normal">
              ({productRatings?.length} ratings)
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Rating
              name="simple-controlled"
              value={ratingsAvg}
              readOnly={true}
              precision={0.5}
            />
            <p>( {ratingsAvg} / 5 ) </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {productRatings?.map((rating) => (
            <div
              key={rating._id}
              className=" text-normal flex flex-col gap-1 border-b"
            >
              <Rating
                name="simple-controlled"
                className=" text-black"
                value={rating.rating}
                size={"small"}
                readOnly={true}
                precision={0.5}
              />
              <div>{rating.message}</div>
              <div className="flex gap-2">
                {rating.img.map((item, index) => (
                  <button
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setSelectedImages(rating.img)}
                  >
                    <img src={item} className="w-20 h-20 rounded-lg" alt="" />
                  </button>
                ))}
              </div>
              <div>
                <p>{rating.userId.name}</p>
                <p>{moment(rating.updatedAt).format("LLL")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImages && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 h-[80vh] w-[30vw] backdrop-opacity-25 flex justify-center">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            grabCursor={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            keyboard={{
              enabled: true,
            }}
            modules={[Pagination, Navigation, Keyboard]}
            className="mySwiper"
          >
            {selectedImages.map((img, index) => (
              <SwiperSlide className=" w-[100%] h-[100%]" key={index}>
                <img
                  key={index}
                  src={img}
                  alt=""
                  className=" h-[100%] w-[100%]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="absolute top-0 right-0 text-black z-50"
            onClick={() => setSelectedImages(null)}
          >
            <CloseIcon className=" text-2xl cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
