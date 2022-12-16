/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setToken, setUser } from "../app/slices";
import { useLogin } from "../hooks/useAuth";
import Error from "../utils/error";
import { signIn, useSession } from "next-auth/react";
import { State } from "../utils/types";
import Smooth from "../utils/smooth";
import { useFormik } from "formik";
import * as yup from 'yup'
import SuccessModel from "../utils/successModel";
import Head from "next/head";
import EastIcon from '@mui/icons-material/East';
import axios from "axios";


const SignInUser = () => {
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false)

  const { data: session } = useSession();


  const submitHandler = async (values) => {
    const response = await axios.post('http://localhost:8000/api/v1/auth/forgotPassword', values)
    if (response.statusText === 'OK') {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }
  };

  const validationObject = yup.object({
    email: yup.string().email("please provide a valid email").required(),
  })

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: submitHandler,
    validateOnBlur: true,
    validationSchema: validationObject
  })


  return (
    <Smooth className=" min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 text-xs">
      <Head>
        <title>Myntra - logIn</title>
        <link rel="icon" type="image/png" href="https://images.indianexpress.com/2021/01/myntra.png" />
        <meta
          name="description"
          content="The only online store you will need to fulfill all your needs"
        />
      </Head>
      {success &&
        <SuccessModel>A Password Reset link has being sent to your email</SuccessModel>
      }
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
              FORGOT PASSWORD
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
                <Error className={formik.errors.email ? "opacity-100" : 'opacity-0'}>{formik.errors.email ? formik.errors.email : ""}</Error>
              </div>
            </div>
            <button
              className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 mt-4 w-60"
              type="submit"
              disabled={!formik.isValid}
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </Smooth>

  );
}
export default SignInUser;
