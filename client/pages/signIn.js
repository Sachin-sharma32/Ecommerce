import React, { useEffect } from "react";
import { Button } from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setToken, setUser } from "../app/slices";
import { useLogin } from "../hooks/useAuth";
import Spinner from "../utils/spinner";
import Error from "../utils/error";
import { useGetMe } from "../hooks/useAuth";

const signIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const onSuccess = (data) => {
        data;
        dispatch(setToken(data.data.token));
        router.push("/");
    };

    const onError = (error) => {
        error;
    };

    const {
        mutate: loginUser,
        isLoading,
        isError,
        error,
    } = useLogin(onSuccess, onError);

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        loginUser(user);
    };

    if (isLoading) {
        return <Spinner />
    } else {
        return (
            <div className=" min-h-screen relative mt-[6rem] m-auto w-fit">
                <div className=" w-fit p-10 text-center shadow-lg">
                    <div className=" text-center m-auto w-fit">
                        <img
                            src="/myntra.png"
                            width={100}
                            height={100}
                            alt="img"
                        />
                    </div>
                    <h2 className=" text-2xl font-semibold">
                        Welcome to Myntra
                    </h2>
                    <form
                        className=" mt-6 flex flex-col items-center"
                        onSubmit={submitHandler}
                    >
                        {isError && (
                            <Error error={error?.response?.data.message} />
                        )}
                        <div className=" flex flex-col items-start ">
                            <label htmlFor="email" className=" text-md">
                                Email
                            </label>
                            <input
                                type="email"
                                className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                                onChange={emailChangeHandler}
                            />
                        </div>
                        <div className=" flex flex-col items-start ">
                            <label htmlFor="password" className=" text-md">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                                onChange={passwordChangeHandler}
                            />
                        </div>
                        <Link
                            href="/forgot-password"
                            className=" text-sm w-60 text-left"
                        >
                            Foregot your password?
                        </Link>
                        <button
                            className=" bg-blue-400 px-10 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 mt-4 w-60"
                            type="submit"
                        >
                            LOG IN
                        </button>
                    </form>
                    <h5 className=" mt-6">OR</h5>
                    <div className="flex flex-col items-center gap-2">
                        <button className=" bg-blue-400 px-10 py-2 w-fit rounded-lg hover:bg-blue-200 transition-all duration-200">
                            <GoogleIcon className=" mr-2" /> Continue with
                            Google
                        </button>
                        <button className=" bg-blue-400 px-10 py-2 w-fit rounded-lg hover:bg-blue-200 transition-all duration-200">
                            <GitHubIcon className=" mr-2" /> Continue with
                            Github
                        </button>
                    </div>
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
    }
};

export default signIn;
