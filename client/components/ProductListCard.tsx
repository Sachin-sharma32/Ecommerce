/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAddToCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { Product, State } from "../utils/types";
import SuccessModel from "../utils/successModel";

interface ProductDetails {
    product: Product;
}

const ProductListCard = ({ product }: ProductDetails) => {
    product;
    const user = useSelector((state: State) => state.auth.user);
    const cart = useSelector((state: State) => state.auth.cart);
    const [success, setSuccess] = useState(false);
    const onSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };
    const { mutate: addToCart } = useAddToCart(cart?._id, onSuccess);
    const addProductToCart = (productObject) => {
        addToCart(productObject);
    };

    return (
        <div className=" w-fit p-0 text-xl font-bold">
            {success && <SuccessModel>added to cart</SuccessModel>}
            <div className="product-card w-fit text-xs">
                <div className=" h-fit w-fit flex justify-center gap-2 cursor-pointer hover:opacity-75 flex-col relative">
                    {product.img && (
                        <Link
                            href={{
                                pathname: `/product/${product._id}`,
                                query: { object: JSON.stringify(product) },
                            }}
                            className=" h-[100%] w-[100%] relative overflow-hidden"
                        >
                            <div className="overflow-hidden">
                                <img
                                    // src={product.coverImg}
                                    src="/girl.jpg"
                                    className=" w-[350px] rounded-lg h-[400px] bg-gray-200 hover:scale-105 transition-all duration-200"
                                    alt="img"
                                />
                            </div>
                            {/* <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 product-icons opacity-0">
                                <Link
                                    href={{
                                        pathname: `/product/${product._id}`,
                                        query: {
                                            object: JSON.stringify(product),
                                        },
                                    }}
                                    className=" bg-white p-2 rounded-full cursor-pointer"
                                >
                                    <SearchIcon />
                                </Link>
                            </div> */}
                            {product.offer && (
                                <div className=" bg-green-400 opacity-90 text-white w-fit px-4 absolute top-0 left-0 rounded-lg text-lg">
                                    {product.offer}
                                </div>
                            )}
                        </Link>
                    )}
                    <div className="flex justify-between">
                        <p className=" capitalize text-md">{product.title}</p>
                        {/* <p className=" text-gray-500 text-lg">
                            {product.desc.slice(0, 30)}....
                        </p> */}
                        <div className="flex gap-4 justify-center items-center">
                            <p
                                className={`text-sm font-semibold ${
                                    product.discountPrice
                                        ? "line-through text-gray-400"
                                        : ""
                                } text-md`}
                            >
                                {" "}
                                &#8377; {product.price}
                            </p>
                            {product.discountPrice && (
                                <p className=" font-semibold text-md">
                                    {" "}
                                    &#8377; {product.discountPrice}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;
