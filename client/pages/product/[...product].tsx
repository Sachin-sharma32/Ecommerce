/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetProduct } from "../../hooks/useProduct";
import Error from "../../utils/error";
import { useAddToCart } from "../../hooks/useCart";
import Spinner from "../../utils/spinner";
import { useSelector } from "react-redux";
import { State } from "../../utils/types";

const Product = () => {
    const [quantity, setQuantity] = useState(1);

    const router = useRouter();
    const productIdArray = router.query.product;
    let productId: string;
    {
        productIdArray && (productId = productIdArray[0]);
    }

    const cart = useSelector((state: State) => state.auth.cart)

    let {
        isLoading,
        isError,
        error,
        data: product,
    } = useGetProduct(productId);

    const { mutate: addToCart } = useAddToCart(cart?._id, quantity);
    const addProductToCart = () => {
        addToCart(productId);
    };

    const bgClass = {
        gray: " bg-gray-500",
        red: " bg-red-500",
        orange: "bg-orange-500",
        yellow: " bg-yellow-500",
        green: " bg-green-500",
        teal: " bg-teal-500",
        blue: " bg-blue-500",
        indigo: " bg-indigo-500",
        purple: " bg-purple-500",
        pink: " bg-pink-500 ",
        white: "bg-white",
        black: "bg-black",
    };

    return (
        <div className=" mt-[4rem] min-h-screen flex justify-center items-center">
            {isLoading ? (
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div>
            ) : isError ? (
                <Error error={error.response.data.message} />
            ) : product ? (
                <div>
                    <div className=" p-10 grid grid-cols-1 md:grid-cols-2  gap-10">
                        <div className=" bg-blue-100 p-10 flex items-center justify-center">
                            <img
                                src={product.img}
                                className=" w-[300px] h-[300px]"
                                alt="img"
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <h1 className=" text-4xl font-semibold">
                                {product.title}
                            </h1>
                            <p>{product.desc}</p>
                            <h2 className="text-4xl">$ {product.price}</h2>
                            <div className="flex gap-10">
                                <div className="flex gap-2">
                                    <h3 className=" text-2xl">Colors:</h3>
                                    {product.color.map((col: string) => (
                                        <div key={col}
                                            className={` w-10 h-10 ${bgClass[col]} rounded-full border-2`}
                                        ></div>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <h3 className=" text-2xl">Size</h3>
                                    <select className=" bg-white border-2 p-1 text-center outline-none">
                                        {product.size.map((item: string) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setQuantity((current) => {
                                            if (current > 1) {
                                                return current - 1;
                                            } else {
                                                return 1;
                                            }
                                        });
                                    }}
                                >
                                    <RemoveIcon className=" cursor-pointer" />
                                </button>
                                <p className=" border-2 px-4 border-blue-500 rounded-lg">
                                    {quantity}
                                </p>
                                <button
                                    onClick={() => {
                                        setQuantity((current) => current + 1);
                                    }}
                                >
                                    <AddIcon className=" cursor-pointer" />
                                </button>
                            </div>
                            <button
                                onClick={addProductToCart}
                                className=" text-black hover:bg-blue-500 hover:text-white px-4 py-2 transition-all duration-200 w-fit bg-blue-500 rounded-md"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" bg-red-500 p-10 flex justify-center text-white rounded-lg">
                    LogIn To See This Product
                </div>
            )}
        </div>
    );
};

export default Product;
