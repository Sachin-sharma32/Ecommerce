/* eslint-disable @next/next/no-img-element */
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
import { signIn, useSession } from "next-auth/react";
import { State } from "../utils/types";
import { motion } from "framer-motion";
import Smooth from "../utils/smooth";
import { useFormik } from "formik";
import * as yup from "yup";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import Head from "next/head";
import EastIcon from "@mui/icons-material/East";

const SignInUser = () => {
    const dispatch = useDispatch();

    const [success, setSuccess] = useState(false);

    const token = useSelector((state: State) => state.auth.accessToken);

    const { data: session } = useSession();
    const onSuccess = (data: any) => {
        dispatch(setToken(data.data.token));
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            router.push("/");
        }, 1000);
    };

    const onError = (error) => {};

    const {
        mutate: loginUser,
        isLoading,
        isError,
        error,
    } = useLogin(onSuccess, onError);

    const submitHandler = async (values) => {
        loginUser(values);
    };

    const signInGoogle = async () => {
        signIn("google");
    };

    useEffect(() => {
        if (session) {
            const user = {
                name: session?.user.name,
                email: session?.user.email,
                img: session?.user.image,
                oAuth: true,
            };
            loginUser(user);
        }
    }, [session, loginUser]);

    const validationObject = yup.object({
        email: yup.string().email("please provide a valid email").required(),
        password: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: submitHandler,
        validateOnBlur: true,
        validationSchema: validationObject,
    });

    return (
        <Smooth className=" min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 text-xs">
            <Head>
                <title>Myntra - logIn</title>
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
            {success && <SuccessModel>Logged in successfully</SuccessModel>}
            {isError && <ErrorModel>{error?.response.data.message}</ErrorModel>}
            <div className="mt-[4rem] grid grid-cols-1 lg:grid-cols-2 form__background  h-fit shadow-2xl justify-items-center min-w-[70vw] max-w-[90%]">
                <div className=" w-fit p-10 text-center flex flex-col gap-4">
                    <div className=" text-center m-auto w-fit flex flex-col items-center">
                        <img
                            src="/myntra.png"
                            width={100}
                            height={100}
                            alt="img"
                        />
                        <h2 className=" text-lg font-semibold text-gray-800">
                            WELCOME TO MYNTRA
                        </h2>
                    </div>
                    <form
                        className=" items-center"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className=" grid grid-cols-1 gap-6 gap-y-2">
                            <div className=" flex flex-col items-start ">
                                <label htmlFor="email" className=" text-md">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className=" p-2 w-60 outline-none bg-white  rounded-sm focus:shadow-lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <Error
                                    className={
                                        formik.errors.email
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                >
                                    {formik.errors.email
                                        ? formik.errors.email
                                        : ""}ADbg-white  rounded-sm focus:shadow-lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <Link
                                    href="/forgotPassword"
                                    className="flex items-center gap-1 hover:gap-4 transition-all duration-200 hover:border-b-gray-500 border-b border-b-transparent"
                                >
                                    <p>Forgot Password</p>
                                    <EastIcon />
                                </Link>
                                <Error
                                    className={
                                        formik.errors.password
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                >
                                    {formik.errors.password
                                        ? formik.errors.password
                                        : ""}
                                </Error>
                            </div>
                        </div>
                        <button
                            className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 mt-4 w-60"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            LOG IN
                        </button>
                    </form>
                    <div className="flex flex-col w-full justify-center items-center gap-2">
                        <button
                            onClick={signInGoogle}
                            className=" active:translate-y-5 border border-black text-black px-4 py-2 rounded-sm transition-all duration-200 w-60 flex gap-4 justify-center items-center"
                        >
                            <img src="/google.png" className=" w-6" />{" "}
                            <p>Continue with google</p>
                        </button>
                    </div>
                </div>
                <div className=" "></div>
            </div>
        </Smooth>
    );
};
export default SignInUser;
