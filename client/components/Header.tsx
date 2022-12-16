import React, { useEffect, useRef } from "react";
import HeaderCard from "./HeaderCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import ErrorBoundry from "../utils/ErrorBoundry";
import { sliderClasses } from "@mui/material";
import { useSelector } from "react-redux";
import CategoryCard from "./CollectionCard";
import CollectionCard from "./CollectionCard";
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow, Keyboard } from "swiper";
import "swiper/css";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Smooth from "../utils/smooth";


const Header = () => {
    const selectedCategory = useSelector((state) => state.auth.selectedCategory)
    let collections = useSelector((state) => state.auth.collections);
    const [filterCollection, setFilterCollection] = useState([])
    useEffect(() => {
        if (selectedCategory) {
            setFilterCollection(collections.filter((collection) => {
                return collection.category == selectedCategory.title
            }))
        } else {
            setFilterCollection(collections)
        }
    }, [filterCollection, collections, selectedCategory])
    return (
        <Smooth className="mt-[7rem] min-h-[60vh] max-h-[100vh]">
            <Swiper
                effect={"coverflow"}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 50,

                    }
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: false,
                }}
                style={{
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={30}
                navigation={true}
                grabCursor={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                keyboard={{
                    enabled: true,
                }}
                modules={[Pagination, Navigation, Autoplay, EffectCoverflow, Keyboard]}
                className="mySwiper"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {filterCollection?.map((collection) => (
                    <SwiperSlide key={collection._id} className=" h-[20%] mb-10" > <HeaderCard card={collection} /></SwiperSlide>
                ))}

            </Swiper>
        </Smooth >
    );
};

export default React.memo(Header);
