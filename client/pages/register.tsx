/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import router from "next/router";
import { useCreateCart, useLogin, useRegister } from "../hooks/useAuth";
import Spinner from "../utils/spinner";
import Error from "../utils/error";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../app/slices";
import { State, User } from "../utils/types";
import { useFormik } from 'formik'
import * as yup from 'yup'
import Success from "./success";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import Smooth from "../utils/smooth";
import Head from "next/head";

const Register = () => {
    const { data: session } = useSession();

    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const token = useSelector((state: State) => state.auth.accessToken);

    const onSuccess = (userData: any) => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false)
            router.push("/signIn");
        }, 1000)
    };

    const onError = (error: any) => {
        setIsError(true);
        setTimeout(() => {
            setIsError(false)
        }, 2000)
    };

    const {
        mutate: registerUser,
        data: userData,
        isLoading,
        error
    } = useRegister(onSuccess, onError);

    const submitHandler = async (values) => {
        registerUser(values);
    };

    const dispatch = useDispatch();

    const onLogInSuccess = (data: any) => {
        dispatch(setToken(data.data.token));
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
            router.push("/");
        }, 1000)
    };
    const onLogInError = () => {
        setIsError(true)
        setTimeout(() => {
            setIsError(false)
            router.push("/");
        }, 1000)
    };
    const { mutate: login, error: logInError } = useLogin(onLogInSuccess, onLogInError);

    const signInGoogle = async () => {
        signIn('google')
    };

    useEffect(() => {
        if (session) {
            const user = {
                name: session?.user.name,
                email: session?.user.email,
                img: session?.user.image,
                oAuth: true,
            };
            login(user);
        }
    }, [session, login])

    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    const validationObject = yup.object({
        name: yup.string().min(3, "name should be atleast 3 characters long").required(" name field cannot be empty"),
        email: yup.string().email("please provide a valid email").required(),
        password: yup.string().matches(PASSWORD_REGEX, "please provider a strong password").required(),
        passwordConfirm: yup.string().required().when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('password')], "passwords does not match")
        })
    })

    const formik = useFormik({
        //* these names will match the "name" of input field
        initialValues: { name: "", email: "", password: "", passwordConfirm: "" },
        validateOnBlur: true,
        onSubmit: submitHandler,
        validationSchema: validationObject
    })

    return (
        <Smooth className=" min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 text-xs">
            <Head>
                <title>Myntra - register</title>
                <link rel="icon" type="image/png" href="https://images.indianexpress.com/2021/01/myntra.png" />
                <meta
                    name="description"
                    content="The only online store you will need to fulfill all your needs"
                />
            </Head>
            {success &&
                <SuccessModel>Registered Successfully</SuccessModel>
            }
            {isError && (
                <ErrorModel>{error?.response.data.message}</ErrorModel>
            )}
            {isError && (
                <ErrorModel>{logInError.response.data.message}</ErrorModel>
            )}
            <div className="mt-[4rem] grid grid-cols-1 lg:grid-cols-2 form__background justify-items-center  h-fit shadow-2xl min-w-[70vw] max-w-[90%]">
                <div className=" w-fit p-10 text-center flex flex-col gap-4">
                    <div className=" text-center m-auto w-fit flex flex-col items-center">
                        <img
                            src="/myntra.png"
                            width={100}
                            height={100}
                            alt="img"
                        />
                        <h2 className=" text-2xl font-semibold text-gray-800">
                            Welcome to Myntra
                        </h2>
                    </div>
                    <form
                        className=" items-center"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className=" grid grid-cols-1 xl:grid-cols-2 gap-6 gap-y-2">

                            <div className=" flex flex-col items-start ">
                                <label htmlFor="name" className=" text-md">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className=" p-2 w-60 outline-none bg-white  rounded-sm focus:shadow-lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    /* //* to handle validateOnBlur */
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <Error>{formik.errors.name && formik.touched.name ? formik.errors.name : ""}</Error>
                            </div>
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
                                <Error>{formik.errors.email && formik.touched.email ? formik.errors.email : ""}</Error>

                            </div>
                            <div className=" flex flex-col items-start ">
                                <label htmlFor="password" className=" text-md">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className=" p-2 w-60 outline-none bg-white  rounded-sm focus:shadow-lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <Error>{formik.errors.password && formik.touched.password ? formik.errors.password : ""}</Error>

                            </div>
                            <div className=" flex flex-col items-start ">
                                <label htmlFor="password" className=" text-md">
                                    Password Confirm
                                </label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    className=" p-2 w-60 outline-none bg-white  rounded-sm focus:shadow-lg"
                                    onChange={formik.handleChange}
                                    value={formik.values.passwordConfirm}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <Error>{formik.errors.passwordConfirm && formik.touched.passwordConfirm ? formik.errors.passwordConfirm : ""}</Error>
                            </div>
                        </div>
                        <button
                            className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 mt-4 w-60"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="flex flex-col w-full justify-center items-center gap-2">
                        <button
                            onClick={signInGoogle}
                            className=" active:translate-y-5 border border-black text-black px-4 py-2 rounded-sm transition-all duration-200 w-60 flex gap-4 justify-center items-center"
                        >
                            <img src="/google.png" className=" w-6" /> <p>Continue with google</p>
                        </button>
                    </div>
                </div>
                <div className=" "></div>
            </div>
        </Smooth>
    );
}
export default Register;
