/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../utils/error";
import { signIn, useSession } from "next-auth/react";
import Smooth from "../../utils/smooth";
import { useFormik } from "formik";
import * as yup from "yup";
import SuccessModel from "../../utils/successModel";
import Head from "next/head";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import ErrorModel from "../../utils/errorModel";

const SignInUser = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const onSuccess = () => {
    console.log("success");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push("/signIn");
    }, 2000);
  };

  const onError = (serverError) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const { mutate: forgetPassword, error: serverError } = useMutation(
    "forgetPassword",
    (values) => {
      return axios.post(
        `http://localhost:8000/api/v1/auth/resetPassword/${token}`,
        values
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  const submitHandler = async (values) => {
    forgetPassword(values);
  };

  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validationObject = yup.object({
    password: yup
      .string()
      .matches(PASSWORD_REGEX, "please provide a stronger password")
      .required(),
    passwordConfirm: yup
      .string()
      .required()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "passwords does not match"),
      }),
  });

  const formik = useFormik({
    initialValues: { password: "", passwordConfirm: "" },
    onSubmit: submitHandler,
    validateOnBlur: true,
    validationSchema: validationObject,
  });

  return (
    <Smooth className=" min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 text-black text-normal">
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
      <div className="mt-[4rem] grid grid-cols-1 lg:grid-cols-2 form__background  h-fit shadow-2xl justify-items-center min-w-[70vw] max-w-[90%]">
        {error && <ErrorModel>{serverError.response.data.message}</ErrorModel>}
        {success && <SuccessModel>Password Changed Successfully</SuccessModel>}
        <div className=" w-fit p-10 text-center flex flex-col gap-4">
          <div className=" text-center m-auto w-fit flex flex-col items-center">
            <img src="/myntra.png" width={100} height={100} alt="img" />
            <h2 className=" text-xl font-semibold text-black">
              Reset Password
            </h2>
          </div>
          <form className=" items-center" onSubmit={formik.handleSubmit}>
            <div className=" grid grid-cols-1 gap-6 gap-y-2">
              <div className=" flex flex-col items-start ">
                <label htmlFor="email" className=" text-md">
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
                <Error
                  className={
                    formik.errors.password ? "opacity-100" : "opacity-0"
                  }
                >
                  {formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ""}
                </Error>
              </div>
              <div className=" flex flex-col items-start ">
                <label htmlFor="email" className=" text-md">
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
                <Error
                  className={
                    formik.errors.passwordConfirm ? "opacity-100" : "opacity-0"
                  }
                >
                  {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm
                    ? formik.errors.passwordConfirm
                    : ""}
                </Error>
              </div>
            </div>
            <button
              className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 mt-4 w-60"
              type="submit"
              disabled={!formik.isValid}
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </Smooth>
  );
};
export default SignInUser;
