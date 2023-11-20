/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "../app/slices";
import axios from "axios";
import { useUpdateUser } from "../hooks/useAuth";
import { State } from "../utils/types";
import Smooth from "../utils/smooth";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Error from "../utils/error";
import { TextField } from "@mui/material";
import SuccessModel from "../utils/successModel";

const SignIn = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.auth.user);
  const cart = useSelector((state: State) => state.auth.cart);
  console.log(cart);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);

  const onSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };
  const onError = (err) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const { mutate: updateUser, error: err } = useUpdateUser(
    user?._id,
    onSuccess,
    onError
  );

  const submitHandler = async (values) => {
    const response = await axios.post(
      "http://localhost:8000/api/payment",
      cart
    );
    console.log(response);
    if (response.statusText === "OK") {
      window.location.href = response.data.url;
    }
    updateUser(values);
  };

  const validationObject = yup.object({
    house: yup.string().required("this field is required"),
    street: yup.string().required("this field is required"),
    area: yup.string().required("this field is required"),
    city: yup.string().required("this field is required"),
    state: yup.string().required("this field is required"),
    country: yup.string().required("this field is required"),
  });

  const initialValues = {
    house: user?.address?.house,
    street: user?.address?.street,
    area: user?.address?.area,
    city: user?.address?.city,
    state: user?.address?.state,
    country: user?.address?.country,
  };

  return (
    <Smooth className=" h-screen flex justify-center items-center text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-black">
      {success && <SuccessModel>Redirecting To Payment</SuccessModel>}
      {error && <SuccessModel>{err.response.data.message}</SuccessModel>}
      <Head>
        <title>Myntra - checkout</title>
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
      <div className=" grid grid-cols-1 checkout__background max-w-[1200px] max-h-[90vh] shadow-2xl justify-items-center min-w-[70vw]">
        <div className=" w-fit p-10 text-center flex flex-col gap-4">
          <div className=" text-center m-auto w-fit flex flex-col items-center">
            <img src="/myntra.png" width={100} height={100} alt="img" />
            <h2 className=" text-2xl font-semibold text-black">
              Welcome to Myntra
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationObject}
            validateOnBlur={true}
            validateOnChange={true}
          >
            {(props) => (
              <Form className=" items-center">
                <div className=" grid grid-cols-2 gap-10 gap-y-4 mb-10">
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.house}
                      label="house"
                      variant="standard"
                      type="text"
                      name="house"
                      defaultValue={user?.address?.house}
                      value={props.values.house}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.house && props.touched.house
                          ? props.errors.house
                          : ""
                      }
                    />
                  </div>
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.street}
                      label="street"
                      variant="standard"
                      type="text"
                      name="street"
                      defaultValue={user?.address?.street}
                      value={props.values.street}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.street && props.touched.street
                          ? props.errors.street
                          : ""
                      }
                    />
                  </div>
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.area}
                      label="area"
                      variant="standard"
                      type="text"
                      name="area"
                      defaultValue={user?.address?.area}
                      value={props.values.area}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.area && props.touched.area
                          ? props.errors.area
                          : ""
                      }
                    />
                  </div>
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.city}
                      label="city"
                      variant="standard"
                      type="text"
                      name="city"
                      defaultValue={user?.address?.city}
                      value={props.values.city}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.city && props.touched.city
                          ? props.errors.city
                          : ""
                      }
                    />
                  </div>
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.state}
                      label="state"
                      variant="standard"
                      type="text"
                      name="state"
                      defaultValue={user?.address?.state}
                      value={props.values.state}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.state && props.touched.state
                          ? props.errors.state
                          : ""
                      }
                    />
                  </div>
                  <div className=" flex flex-col items-start ">
                    <TextField
                      error={props.errors.country}
                      label="country"
                      variant="standard"
                      type="text"
                      name="country"
                      defaultValue={user?.address?.country}
                      value={props.values.country}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={
                        props.errors.country && props.touched.country
                          ? props.errors.country
                          : ""
                      }
                    />
                  </div>
                </div>
                <button
                  className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 mt-4 w-60"
                  type="submit"
                  disabled={!props.isValid}
                >
                  LOG IN
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Smooth>
  );
};

export default SignIn;

SignIn.getInitialProps = async () => {
  return {
    title: "Checkout",
    image: "/shremz.png",
    summery:
      "Elevate your wardrobe with our fashion-forward collections. Discover the perfect blend of trends and timeless classics. Unleash your inner fashionista and shop with confidence. Experience effortless style delivered right to your doorstep. Embrace the essence of chic and define your own fashion narrative with Shremz.",
    keywords: "shremz e-commerce bag women-bag purse shoes clothing store",
    type: "website",
    imageAlt: "Shremz",
    parameter: "checkout",
  };
};
