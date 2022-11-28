/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { setTotal } from "../app/slices";
import { useRouter } from "next/router";
import { useAddToCart, useGetCart, useRemoveFromCart } from "../hooks/useCart";
import { useQueryClient } from "react-query";
import { ProductWithQuantity, State } from "../utils/types";
import ErrorBoundry from "../utils/ErrorBoundry";

const Cart = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.auth.user);

    const { data: cart } = useGetCart(user?._id);

    const token = useSelector((state: State) => state.auth.accessToken);

    const router = useRouter();

    useEffect(() => {
        dispatch(setTotal());
    }, [cart, dispatch]);

    const total = useSelector((state: State) => state.auth.total);

    const { mutate: addToCart } = useAddToCart(cart?._id);
    const addProductToCart = (productId: string) => {
        addToCart(productId);
    };

    const queryClient = useQueryClient();
    const onSuccess = (data: any): any => {
        queryClient.setQueryData("getCart", () => {
            return data;
        });
    };

    const { mutate: removeFromCart, data } = useRemoveFromCart(
        cart?._id,
        onSuccess
    );
    const removeProductFromCart = (productId: string) => {
        removeFromCart(productId);
    };
    return (
        <div className=" min-h-screen mt-[6rem] px-10 text-lg">
            <h1 className=" w-fit m-auto text-5xl font-semibold sticky">
                YOUR CART
            </h1>
            <div className="flex justify-between mt-10">
                <Link
                    href="/"
                    className=" border-2 border-black hover:border-white rounded-lg flex justify-center items-center px-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                    CONTINUE SHOPPING
                </Link>
                <Link
                    href="/"
                    className=" border-2 bg-black text-white border-white hover:border-black rounded-lg flex justify-center items-center px-4 py-1 hover:bg-white hover:text-black transition-all duration-200"
                >
                    CHECKOUT NOW
                </Link>
            </div>

            <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-10 justify-items-center">
                <div className="flex flex-col gap-10">
                    <ErrorBoundry>
                        {cart &&
                            cart.products.map((item: ProductWithQuantity) => (
                                <div
                                    key={item.product._id}
                                    className="flex gap-40 lg:gap-10 border-b-2 pb-2 justify-center items-center"
                                >
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
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    removeProductFromCart(
                                                        item.product._id
                                                    );
                                                }}
                                            >
                                                <RemoveIcon className=" cursor-pointer" />
                                            </button>
                                            <p className=" border-2 px-4 border-blue-500 rounded-lg">
                                                {item.quantity}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    addProductToCart(
                                                        item.product._id
                                                    );
                                                }}
                                            >
                                                <AddIcon className=" cursor-pointer" />
                                            </button>
                                        </div>
                                        <p className=" text-2xl">
                                            Rs. {item.product.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </ErrorBoundry>

                </div>
                <div className=" border-2 w-fit p-4 flex flex-col gap-4 justify-center items-center rounded-lg h-[20rem] sticky top-20">
                    <h2 className=" text-4xl">ORDER SUMMARY</h2>
                    <p>
                        <span className=" font-semibold">Subtotal:</span>: Rs.{" "}
                        {total}
                    </p>
                    <p>
                        <span className=" font-semibold">
                            Esitmated Shipping Cost:
                        </span>
                        : Rs. 100
                    </p>
                    <p>
                        <span className=" font-semibold">Discount:</span>: Rs.
                        50
                    </p>
                    <p>
                        <span className=" font-semibold">Total:</span>: Rs.{" "}
                        {total}
                    </p>
                    <button
                        onClick={() => {
                            if (token) {
                                router.push("/checkout");
                            } else {
                                router.push("/signIn");
                            }
                        }}
                        className=" border-2 bg-black text-white border-white hover:border-black rounded-lg flex justify-center items-center px-4 py-1 hover:bg-white hover:text-black transition-all duration-200"
                    >
                        CHECKOUT NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
