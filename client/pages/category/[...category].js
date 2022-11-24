import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductList from "../../components/ProductList";
import { useGetProducts } from "../../hooks/useProduct";

const category = () => {
    const router = useRouter();
    const { category } = router.query;

    const [sort, setSort] = useState("Newest");
    const [filterColor, setFilterColor] = useState("all");
    const [filterSize, setFilterSize] = useState("all");

    const sortHandler = (e) => {
        setSort(e.target.value);
    };

    const colorChangeHandler = (e) => {
        setFilterColor(e.target.value);
    };

    const sizeChangeHandler = (e) => {
        setFilterSize(e.target.value);
    };

    return (
        <div className=" min-h-screen mt-[4rem]">
            <div className=" p-10">
                <h1 className=" text-4xl font-semibold">{category}</h1>
                <div className="flex justify-between mt-8">
                    <div>
                        <h4 className=" text-xl">Filter</h4>
                        <div className="flex gap-4">
                            <select
                                className=" bg-white border-2 p-1"
                                onChange={colorChangeHandler}
                            >
                                <option value="all">All</option>
                                <option value="blue">blue</option>
                                <option value="red">red</option>
                                <option value="pink">pink</option>
                                <option value="black">black</option>
                                <option value="white">gray</option>
                                <option value="white">orange</option>
                                <option value="white">yellow</option>
                                <option value="white">green</option>
                                <option value="white">indigo</option>
                                <option value="white">purple</option>
                                <option value="white">white</option>
                            </select>
                            <select
                                className=" bg-white border-2 p-1"
                                onChange={sizeChangeHandler}
                            >
                                <option value="all">All</option>
                                <option value="xs">xs</option>
                                <option value="s">s</option>
                                <option value="m">m</option>
                                <option value="l">l</option>
                                <option value="xl">xl</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4 className=" text-xl">Sort</h4>
                        <select
                            className=" bg-white border-2 p-1"
                            onChange={sortHandler}
                        >
                            <option value="Newest">Newest</option>
                            <option value="Low to High">Low to High</option>
                            <option value="High to Low">High to Low</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>
            <ProductList
                size={filterSize}
                color={filterColor}
                sort={sort}
                category={category && category[0]}
            />
        </div>
    );
};

export default category;
