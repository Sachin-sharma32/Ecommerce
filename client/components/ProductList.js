import React from "react";
import ProductListCard from "./ProductListCard";
import { ColorRing } from "react-loader-spinner";
import { useGetProducts } from "../hooks/useProduct";
import Error from "../utils/error";

const ProductList = ({ sort, color, size, category, limit }) => {
    let { isLoading, isError, error, data: products } = useGetProducts();

    if (limit) {
        products = products?.slice(0, 8);
    }

    const selectedCategory = category?.toLowerCase();

    if (selectedCategory) {
        if (selectedCategory === "wedding") {
            products = products?.filter((item) => {
                return item.category.includes("wedding");
            });
        } else if (selectedCategory === "shirts") {
            products = products?.filter((item) => {
                return (
                    item.category.includes("shirt") ||
                    item.category.includes("tshirt")
                );
            });
        } else if (selectedCategory === "party") {
            products = products?.filter((item) => {
                return item.category.includes("party");
            });
        }
    }

    if (sort && products) {
        if (sort === "Newest") {
            products.sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
            );
        } else if (sort === "Low to High") {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === "High to Low") {
            products.sort((a, b) => b.price - a.price);
        } else if (sort === "Oldest") {
            products.sort(
                (a, b) =>
                    new Date(a.updatedAt).getTime() -
                    new Date(b.updatedAt).getTime()
            );
        }
    }

    if (color && size) {
        if (color === "all" && size !== "all") {
            products = products?.filter((item) => {
                return item.size.includes(size);
            });
        } else if (size === "all" && color !== "all") {
            products = products?.filter((item) => {
                return item.color.includes(color);
            });
        } else if (color === "all" && size === "all") {
            products = products;
        } else {
            products = products?.filter((item) => {
                return item.color.includes(color) && item.size.includes(size);
            });
        }
    }

    return (
        <div className=" p-10 grid grid-cols-4 gap-2 relative mt-4">
            {isLoading ? (
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                        ]}
                    />
                </div>
            ) : isError ? (
                <Error error={error.response.data.message} />
            ) : products ? (
                products.map((product, index) => (
                    <ProductListCard key={index} product={product} />
                ))
            ) : (
                <div className=" bg-red-500 p-10 flex justify-center text-white rounded-lg">
                    LogIn To See All Products
                </div>
            )}
        </div>
    );
};

export default ProductList;
