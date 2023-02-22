import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../app/slices";

const CategoryBar = () => {
    const categories = useSelector((state) => state.auth.categories);

    const selectedCategory = useSelector(
        (state) => state.auth.selectedCategory
    );
    const dispatch = useDispatch();
    return (
        <div className=" mt-[4rem] flex justify-center gap-10 text-xl fixed top-0 left-0 z-40 w-full bg-white">
            {categories &&
                categories?.map((category, index) => (
                    <div
                        key={index}
                        className=" w-fit h-10 flex items-end uppercase"
                    >
                        <button
                            onClick={() => {
                                dispatch(setSelectedCategory(category));
                                window.scrollTo(0, 0);
                            }}
                            className={`${
                                selectedCategory === category
                                    ? "border-b-2 border-yellow-500"
                                    : " border-b-2 border-transparent"
                            }`}
                        >
                            {category.title}
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default CategoryBar;
