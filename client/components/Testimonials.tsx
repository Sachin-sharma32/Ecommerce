import React, { useState } from "react";
import { useGetAllTestimonials } from "../hooks/useTestimonial";
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
import "swiper/css/effect-coverflow";

const Testimonials = () => {
  const [stories, setStories] = useState(null);
  const onSuccess = (data) => {
    setStories(data.data.data.docs);
  };
  console.log(stories);
  const { data } = useGetAllTestimonials(onSuccess);
  console.log(stories);
  return (
    <div className=" mt-10 flex flex-col items-center text-black">
      <h1 className=" text-lg mb-4 text-center">
        WE ALWAYS TRY TO MAKE OUT CUSTOMERS HAPPY
      </h1>
      <div className=" w-[100%] h-[100%]">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            900: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[Pagination, Navigation, Autoplay, Keyboard]}
          className="mySwiper"
          // autoplay={{
          //     delay: 3000,
          //     disableOnInteraction: false,
          // }}
        >
          {stories?.map((story) => (
            <SwiperSlide
              key={story._id}
              className="md:min-h-[70vh] min-h-[40vh] px-4 w-[100%] bg-gray-100 mb-10 flex justify-center items-center conatiner text-sm"
            >
              <div className=" bg-white flex items-center gap-4 md:gap-20 p-4 md:p-10 overflow-hidden rounded-sm bg-opacity-90 md:w-[700px] md:max-w-[70%]">
                <div className=" rounded-full min-w-[150px] max-w-[150px] h-[150px] flex justify-center items-center overflow-hidden test__container relative">
                  <img
                    src={story.img}
                    alt=""
                    className=" hover:scale-[.8] transition-all duration-500 min-w-[200px] hover:brightness-90 hover:blur-sm"
                  />
                  <div className=" hover:translate-x-48 absolute text-white uppercase translate-y-32 test__text transition-all duration-500">
                    {story.user.name}
                  </div>
                </div>
                <div>{story.message}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
