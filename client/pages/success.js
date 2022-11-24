import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotal } from "../app/slices";
import { createOrder } from "../app/orderSlice";
import { useGetCart } from "../hooks/useCart";

const cart = () => {
    useEffect(() => {
        dispatch(setTotal());
    });

    const token = useSelector((state) => state.auth.accessToken);

    const user = useSelector((state) => state.auth.user);
    const { data: cart } = useGetCart(user?._id);

    const totalPrice = cart?.products.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
    }, 0);

    const products = cart?.products.map((item) => {
        return { product: item.product._id };
    });

    useEffect(() => {
        {
            user &&
                products &&
                dispatch(
                    createOrder({
                        user: user._id,
                        products,
                        amount: totalPrice,
                        address: user.address,
                    })
                );
        }
    }, [user, products]);

    const dispatch = useDispatch();

    return (
        <div className=" min-h-screen mt-[6rem] px-10 text-lg">
            <h1 className=" w-fit m-auto text-5xl font-semibold">
                ORDER PLACED SUCCESSFULLY{" "}
            </h1>
            <div className="flex justify-between mt-10">
                <Link
                    href="/"
                    className=" border-2 border-black hover:border-white rounded-lg flex justify-center items-center px-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                    CONTINUE SHOPPING
                </Link>
            </div>

            <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-10 justify-items-center">
                <div className="flex flex-col gap-10">
                    {cart &&
                        cart.products.map((item, index) => (
                            <div className="flex gap-40 lg:gap-10 border-b-2 pb-2 justify-center items-center">
                                <div className="">
                                    <img
                                        src={item.product.img}
                                        width={200}
                                        height={200}
                                        alt="img"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>
                                        <span className=" font-semibold">
                                            Product:
                                        </span>{" "}
                                        {item.product.title}
                                    </p>
                                    <p>
                                        <span className=" font-semibold">
                                            ID:
                                        </span>
                                        {item.product._id}
                                    </p>
                                    <div className="w-5 h-5 bg-black rounded-full"></div>
                                    <p>
                                        <span className=" font-semibold">
                                            Size:
                                        </span>
                                        : {item.product.size}
                                    </p>
                                </div>
                                <div className=" text-lg">
                                    <p className=" w-24">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p>Rs. {item.product.price}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className=" border-2 w-fit p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className=" text-4xl">ORDER DETAILS</h2>
                    <p>
                        <span className=" font-semibold">Subtotal:</span> Rs.{" "}
                        {totalPrice}
                    </p>
                    <p>
                        <span className=" font-semibold">Total:</span> Rs.{" "}
                        {totalPrice}
                    </p>
                    {user?.address && (
                        <>
                            <p className=" text-xl font-bold">Shipping To: </p>
                            <p className=" text-sm font-semibold">
                                House:{" "}
                                <span className=" font-normal">
                                    {user.address.house}
                                </span>
                            </p>
                            <p className=" text-sm font-semibold">
                                Street:{" "}
                                <span className=" font-normal">
                                    {user.address.street}
                                </span>
                            </p>
                            <p className=" text-sm font-semibold">
                                Area:{" "}
                                <span className=" font-normal">
                                    {user.address.area}
                                </span>
                            </p>
                            <p className=" text-sm font-semibold">
                                City:{" "}
                                <span className=" font-normal">
                                    {user.address.city}
                                </span>
                            </p>
                            <p className=" text-sm font-semibold">
                                State:{" "}
                                <span className=" font-normal">
                                    {user.address.state}
                                </span>
                            </p>
                            <p className=" text-sm font-semibold">
                                Country:{" "}
                                <span className=" font-normal">
                                    {user.address.country}
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default cart;
