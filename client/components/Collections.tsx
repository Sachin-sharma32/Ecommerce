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

const Collections = () => {
    const collections = useSelector((state) => state.auth.collections);
    const products = useSelector((state) => state.auth.products);
    const selectedCategory = useSelector(
        (state) => state.auth.selectedCategory
    );
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

    console.log(filterCollection);

    return (
        <Smooth className=" flex flex-col gap-10 mt-10 px-10">
            {filterCollection?.map((collection, index) => (
                <div
                    key={collection._id}
                    className=" flex flex-col items-center gap-4"
                >
                    {console.log(collection)}
                    <div className="flex flex-col items-center gap-0 w-full text-left">
                        <p className=" uppercase text-4xl cursor-default w-full text-left">
                            {collection.title}
                        </p>
                        {/* <Link
                            href={`/search/${collection.title}`}
                            className=" text-xs flex items-center gap-1 hover:gap-4 cursor-pointer transition-all duration-200"
                        >
                            Checkout All Products
                            <EastIcon />
                        </Link> */}
                    </div>
                    <div className="w-[100%] grid grid-cols-4 gap-4">
                        {products
                            ?.filter(
                                (product) =>
                                    product.collectionName === collection.title
                            )
                            .map((product) => (
                                <div key={product._id} className=" mb-10">
                                    <ProductListCard product={product} />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </Smooth>
    );
};

export default Collections;
