import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductList from "../../components/ProductList";
import { useGetProducts } from "../../hooks/useProduct";
import Smooth from "../../utils/smooth";
import Head from "next/head";

const Search = () => {
    const router = useRouter();
    const { search } = router.query;

    const [sort, setSort] = useState("Newest");
    const [filterColor, setFilterColor] = useState("all");
    const [filterSize, setFilterSize] = useState("all");

    const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const colorChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterColor(e.target.value);
    };

    const sizeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterSize(e.target.value);
    };

    return (
        <Smooth className="min-h-screen mt-[4rem] text-xs">
            <Head>
                <title>Myntra - search/{search ? search : ""}</title>
                <link rel="icon" type="image/png" href="https://images.indianexpress.com/2021/01/myntra.png" />
                <meta
                    name="description"
                    content="The only online store you will need to fulfill all your needs"
                />
            </Head>
            <div className=" p-10">
                <h1 className=" text-2xl font-semibold uppercase">{search}</h1>
                <div className="flex justify-between mt-8">
                    <div>
                        <h4 className=" text-sm">Filter</h4>
                        <div className="flex gap-4">
                            <select
                                className=" bg-white border p-1"
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
                                className=" bg-white border p-1"
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
                        <h4 className=" text-sm">Sort</h4>
                        <select
                            className=" bg-white border p-1"
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
                search={search && search[0]}
            />
        </Smooth>
    );
};

export default Search;
