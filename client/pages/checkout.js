import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "../app/slices";
import { setAddress } from "../app/orderSlice";
import axios from "axios";
import { useGetCart } from "../hooks/useCart";
import { useUpdateUser } from "../hooks/useAuth";

const signIn = () => {
    const dispatch = useDispatch();

    const [house, setHouse] = useState(null);
    const [street, setStreet] = useState(null);
    const [area, setArea] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const { data: cart } = useGetCart(user?._id);

    useEffect(() => {
        dispatch(setTotal());
    }, []);

    const total = useSelector((state) => state.auth.total);

    const { mutate: updateUser } = useUpdateUser(user?._id);

    const submitHandler = async (e) => {
        e.preventDefault();

        // //? (p)
        const response = await axios.post(
            "http://localhost:8000/api/payment",
            cart
        );
        if (response.statusText === "OK") {
            window.location.href = response.data.url;
        }

        const address = { house, street, area, city, state, country };
        updateUser({address});
    };

    return (
        <div className=" min-h-screen relative mt-[6rem] m-auto w-fit">
            <div className=" w-fit p-10 text-center shadow-lg">
                <div className=" text-center m-auto w-fit">
                    <img src="/myntra.png" width={100} height={100} alt="img" />
                </div>
                <h2 className=" text-2xl font-semibold">CheckOut</h2>
                <form
                    className=" mt-6 grid grid-cols-2 gap-2 items-center "
                    onSubmit={submitHandler}
                >
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="house" className=" text-md">
                            Flat No. And Name / House No.
                        </label>
                        <input
                            type="text"
                            name="house"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setHouse(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="street" className=" text-md">
                            Street
                        </label>
                        <input
                            type="text"
                            name="street"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setStreet(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="area" className=" text-md">
                            Area
                        </label>
                        <input
                            type="text"
                            name="area"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setArea(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="city" className=" text-md">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="state" className=" text-md">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setState(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="country" className=" text-md">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <h2 className=" text-lg font-bold">Total : {total}</h2>
                    </div>
                    <button
                        className=" bg-blue-400 px-10 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 mt-4 w-60"
                        type="submit"
                    >
                        PLACE ORDER
                    </button>
                </form>
                <div className=" text-sm">
                    <div className=" mt-10 text-gray-500">
                        By continuing you agree to Myntra's <br />{" "}
                        <span className=" text-black font-semibold">
                            Terms of Service
                        </span>{" "}
                        and asknowledge you've read our{" "}
                        <span className=" text-black font-semibold">
                            Privacy Policy
                        </span>
                    </div>
                    <div className=" mt-2 flex justify-center gap-2 items-center">
                        Not on Myntra yet?{" "}
                        <Link href="/register" className=" text-blue-500">
                            Register
                        </Link>
                    </div>
                    <p className=" text-gray-500">
                        Are you a business? Get started here!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default signIn;
