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

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { data: session } = useSession();

    const token = useSelector((state: State) => state.auth.accessToken);
    if (token) {
        router.push("/");
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const passwordConfirmChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    };

    const { mutate: createCart } = useCreateCart();

    const onSuccess = (userData: any) => {
        router.push("/signInUser");
        createCart(userData);
    };

    const onError = (error: any) => {
        console.log(error)
    };

    const {
        mutate: registerUser,
        data: userData,
        isLoading,
        isError,
        error,
    } = useRegister(onSuccess, onError);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
            passwordConfirm,
        };
        registerUser(user);
    };

    const dispatch = useDispatch();

    const onLogInSuccess = (data: any) => {
        dispatch(setToken(data.data.token));
        router.push("/");
    };
    const { mutate: login } = useLogin(onLogInSuccess);

    const signInGoogle = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await signIn("google").then(() => {
            const user = {
                name: session?.user.name,
                email: session?.user.email,
                img: session?.user.image,
                oAuth: true,
            };
            login(user);
        });
    };

    if (isLoading) {
        <Spinner />;
    } else {
        return (
            <div className=" min-h-screen flex justify-center items-center">
                <div className=" w-fit p-10 text-center shadow-lg mt-24 mb-20">
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
                            <Error error={error.response.data.message} />
                        )}
                        <div className=" flex flex-col items-start ">
                            <label htmlFor="name" className=" text-md">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                                onChange={nameChangeHandler}
                                required
                            />
                        </div>
                        <div className=" flex flex-col items-start ">
                            <label htmlFor="email" className=" text-md">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                                onChange={emailChangeHandler}
                                required
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
                                required
                            />
                        </div>
                        <div className=" flex flex-col items-start ">
                            <label htmlFor="password" className=" text-md">
                                Password Confirm
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                className=" p-3 w-60 outline-none bg-white border-2 border-blue-400 rounded-lg"
                                onChange={passwordConfirmChangeHandler}
                                required
                            />
                        </div>
                        <button
                            className=" bg-blue-400 px-10 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 mt-4 w-60"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <h5 className=" mt-6">OR</h5>
                    <div className="flex flex-col w-full justify-center items-center gap-2">
                        <button
                            onClick={signInGoogle}
                            className=" bg-blue-400 px-10 py-2 w-fit rounded-lg hover:bg-blue-200 transition-all duration-200"
                        >
                            <GoogleIcon className=" mr-2" /> Continue with
                            Google
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
                            Already on Myntra?{" "}
                            <Link href="/signIn" className=" text-blue-500">
                                Sign in
                            </Link>
                        </div>
                        <p className=" text-gray-500">
                            Are you a business? Get started here!
                        </p>
                    </div>
                    <CloseIcon className=" absolute top-4 right-4 cursor-pointer" />
                </div>
            </div>
        );
    }
};

export default Register;
