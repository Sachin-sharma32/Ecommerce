/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setTotal } from "../app/slices";
import { useRouter } from "next/router";
import { useAddToCart, useRemoveFromCart } from "../hooks/useCart";
import { useQueryClient } from "react-query";
import { ProductWithQuantity, State } from "../utils/types";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import Head from "next/head";
import SuccessModel from "../utils/successModel";
import MessageModel from "../utils/messageModel";
import { useAddToWishList } from "../hooks/useWishList";
import ProductList from "../components/ProductList";
import { useUpdateUser } from "../hooks/useAuth";
import axios from "axios";

const Cart = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.auth.user);
    const cart = useSelector((state: State) => state.auth.cart);
    const [success, setSuccess] = useState(false);
    const [wishListSuccess, setWishListSuccess] = useState(false);
    const [removed, setRemoved] = useState(false);
    cart;

    const onAddSuccess = () => {
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };

    const token = useSelector((state: State) => state.auth.accessToken);

    const router = useRouter();

    useEffect(() => {
        dispatch(setTotal());
    }, [cart, dispatch]);

    const total = useSelector((state: State) => state.auth.total);

    const { mutate: addToCart } = useAddToCart(cart?._id, onAddSuccess);
    const addProductToCart = (productObject) => {
        addToCart(productObject);
    };

    const onSuccess = (data: any): any => {
        dispatch(setCart(data.data.data.doc));
        setRemoved(true);
        setTimeout(() => {
            setRemoved(false);
        }, 2000);
    };

    const { mutate: removeFromCart, data } = useRemoveFromCart(
        cart?._id,
        onSuccess
    );
    const removeProductFromCart = (productId, quantity) => {
        removeFromCart({ productId, quantity });
    };

    const onWishListSuccess = () => {
        setWishListSuccess(true);
        setTimeout(() => {
            setRemoved(false);
        }, 2000);
    };
    const wishList = useSelector((state) => state.auth.wishList);
    const { mutate: addToWishList } = useAddToWishList(
        wishList?._id,
        onWishListSuccess
    );
    const addPrudoctToWishList = (productId, color, size) => {
        addToWishList({ productId, color, size });
    };

    const submitHandler = async () => {
        console.log(cart)
        if (token) {
            const response = await axios.post(
                "http://localhost:8000/api/payment",
                cart
            );
            if (response.statusText === "OK") {
                window.location.href = response.data.url;
            }
        } else {
            router.push("/signIn");
        }
    };

    return (
        <Smooth className=" min-h-screen mt-10 px-10 text-sm mb-20">
            {success && <SuccessModel>added to cart</SuccessModel>}
            {removed && <SuccessModel>removed from cart</SuccessModel>}
            <Head>
                <title>Myntra - cart</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="https://images.indianexpress.com/2021/01/myntra.png"
                />
                <meta
                    name="description"
                    content="The only online store you will need to fulfill all your needs"
                />
            </Head>
            <h1 className=" w-fit m-auto text-2xl font-semibold sticky">
                YOUR CART
            </h1>
            <div className="flex justify-between mt-10 rounded-lg">
                <Link
                    href="/"
                    className=" border border-black hover:border-white rounded-lg flex justify-center items-center px-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                    CONTINUE SHOPPING
                </Link>
                {cart?.products?.length > 0 && (
                    <button
                        onClick={submitHandler}
                        className=" rounded-lg border bg-black text-white border-white hover:border-black flex justify-center items-center px-4 py-1 hover:bg-white hover:text-black transition-all duration-200"
                    >
                        CHECKOUT NOW
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-10 justify-items-center">
                <div className="flex flex-col gap-10 w-full">
                    <ErrorBoundry>
                        {cart?.products?.length === 0 && (
                            <MessageModel>Cart is empty</MessageModel>
                        )}
                        {cart &&
                            cart.products.map((item: ProductWithQuantity) => (
                                <div
                                    key={item._id}
                                    className="border flex flex-col justify-center items-center rounded-lg"
                                >
                                    <div className="flex gap-10 p-2  justify-between items-center w-full">
                                        <div>
                                            <img
                                                src={item.product.img[0]}
                                                className=" w-[100px] h-[100px] rounded-lg"
                                                alt="img"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p>{item.product.title}</p>
                                            <p className=" text-sm font-semibold">
                                                Rs.{" "}
                                                {item.product.discountPrice
                                                    ? item.product.discountPrice
                                                    : item.product.price}
                                            </p>
                                            <div className="flex gap-4">
                                                <select
                                                    name="color"
                                                    id=""
                                                    className=" bg-white border p-1 text-center outline-non rounded-lg outline-none"
                                                    onChange={(e) =>
                                                        addProductToCart({
                                                            itemId: item._id,
                                                            color: e.target
                                                                .value,
                                                        })
                                                    }
                                                >
                                                    {item.product.color.map(
                                                        (col) => (
                                                            <>
                                                                <option
                                                                    value={col}
                                                                    selected={
                                                                        col ===
                                                                        item.color
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    {col}
                                                                </option>
                                                            </>
                                                        )
                                                    )}
                                                </select>
                                                <select
                                                    name="size"
                                                    id=""
                                                    className=" bg-white border p-1 text-center outline-none rounded-lg"
                                                    onChange={(e) =>
                                                        addProductToCart({
                                                            itemId: item._id,
                                                            size: e.target
                                                                .value,
                                                        })
                                                    }
                                                >
                                                    {item.product.size.map(
                                                        (value) => (
                                                            <>
                                                                <option
                                                                    value={
                                                                        value
                                                                    }
                                                                    selected={
                                                                        value ==
                                                                        item.size
                                                                    }
                                                                >
                                                                    {value}
                                                                </option>
                                                            </>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => {
                                                        removeProductFromCart(
                                                            item.product._id
                                                        );
                                                    }}
                                                >
                                                    <RemoveIcon className=" cursor-pointer" />
                                                </button>
                                                <p className=" border px-2 border-blue-500 rounded-lg">
                                                    {item.quantity}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        addProductToCart({
                                                            productId:
                                                                item.product
                                                                    ._id,
                                                            quantity: 1,
                                                            color: item.color,
                                                            size: item.size,
                                                        });
                                                    }}
                                                >
                                                    <AddIcon className=" cursor-pointer" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-evenly border-t">
                                        <button
                                            className=" uppercase w-full border-r hover:bg-black hover:text-white transition-all duration-200 rounded-lg"
                                            onClick={() => {
                                                removeProductFromCart(
                                                    item.product._id,
                                                    item.quantity
                                                );
                                            }}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className=" uppercase w-full hover:bg-black hover:text-white transition-all duration-200 rounded-lg"
                                            onClick={() => {
                                                addPrudoctToWishList(
                                                    item.product._id,
                                                    item.color,
                                                    item.size
                                                );
                                                removeProductFromCart(
                                                    item.product._id,
                                                    item.quantity
                                                );
                                            }}
                                        >
                                            move to wistlist
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </ErrorBoundry>
                </div>
                {cart?.products.length > 0 && (
                    <div className=" border w-fit p-4 flex flex-col gap-4 justify-center text-left rounded-lg h-fit sticky top-20">
                        <h2 className=" text-xl font-semibold text-center">
                            ORDER SUMMARY
                        </h2>
                        <table className="border border-collapse rounded-lg">
                            <tr className=" bg-gray-100">
                                <td className=" border w-32 p-2 text-left">
                                    Name
                                </td>
                                <td className=" border w-32 p-2">Quantity</td>
                                <td className=" border w-32 p-2 text-left">
                                    Unit Price
                                </td>
                                <td className=" border w-32 p-2 text-left">
                                    SubTotal
                                </td>
                            </tr>
                            {cart.products.map((product) => (
                                <tr key={product._id}>
                                    <td className=" border w-32 p-2 text-left">
                                        {product.product.title}
                                    </td>
                                    <td className=" border w-32 p-2">
                                        {product.quantity}
                                    </td>
                                    <td className=" border w-32 p-2 text-left">
                                        {product.product.discountPrice
                                            ? product.product.discountPrice
                                            : product.product.price}
                                    </td>
                                    <td className=" border w-32 p-2 text-left">
                                        {product.product.discountPrice
                                            ? product.product.discountPrice *
                                              product.quantity
                                            : product.product.price *
                                              product.quantity}
                                    </td>
                                </tr>
                            ))}
                            <tr className="text-black">
                                <td className=" w-32 p-2"></td>
                                <td className="w-32 p-2 text-left"></td>
                                <td className="w-32 p-2 text-left border bg-gray-100 font-extrabold text-gray-500">
                                    Total
                                </td>
                                <td className=" w-32 p-2 text-left mt-10 border bg-gray-100 font-extrabold text-gray-500">
                                    {total}
                                </td>
                            </tr>
                        </table>
                        <button
                            onClick={submitHandler}
                            className=" border bg-black text-white border-white hover:border-black rounded-lg flex justify-center items-center px-4 py-1 hover:bg-white hover:text-black transition-all duration-200"
                        >
                            CHECKOUT NOW
                        </button>
                    </div>
                )}
            </div>
        </Smooth>
    );
};

export default Cart;
