/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useGetMe, useUpdateUser } from "../hooks/useAuth";
import { useFormik } from 'formik'
import * as yup from 'yup'
import Error from "../utils/error";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import { useSelector } from "react-redux";
import { State } from "../utils/types";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

const UpdateAccount = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [tab, setTab] = useState(null)
    const [current, setCurrent] = useState(1)

    const user = useSelector((state: State) => state.auth.user)

    const onSuccess = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 1000)
    }

    const onError = () => {
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    const { mutate: updateUser, data: updatedUser, isError, error: err } = useUpdateUser(user?._id, onSuccess, onError);

    const submitHandler = async (values) => {
        (values)
        const userData = {
            ...values,
        };
        updateUser(userData);
    };
    const submitHandlerWithAddress = async (values) => {
        (values)
        const userData = {
            address: values
        };
        updateUser(userData);
    };

    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/


    const validationObject = yup.object({
        name: yup.string().min(3, "name should atleast 3 characters long").required(),
        email: yup.string().email("please provide a valid email").required(),
        password: yup.string().matches(PASSWORD_REGEX, "please provide a stronger password")
    })
    const addressValidationObject = yup.object({
        house: yup.number().required(),
        street: yup.string().required(),
        area: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        country: yup.string().required(),
    })

    const formik = useFormik({
        initialValues: { name: user?.name, email: user?.email, password: '' },
        onSubmit: submitHandler,
        validateOnBlur: true,
        validationSchema: validationObject
    })
    const addFormik = useFormik({
        initialValues: { house: user?.address?.house, street: user?.address?.street, area: user?.address?.area, city: user?.address?.city, state: user?.address?.state, country: user?.address?.country },
        onSubmit: submitHandlerWithAddress,
        validateOnBlur: true,
        validationSchema: addressValidationObject
    })


    return (
        <div className="flex min-h-screen gap-10 text-xs max-w-[1200px] w-[100%] justify-center md:justify-start">
            {success && <SuccessModel>updated successfully</SuccessModel>}
            {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
            <div className=" hidden md:flex items-center gap-10 flex-col">
                <div className="md:flex flex-col gap-4 hidden">
                    <button className="gap-1 hover:gap-4 transition-all duration-200 flex items-center" onClick={() => { setTab(true) }}>
                        My Account
                        <EastIcon />
                    </button>
                    <button className="gap-1 hover:gap-4 transition-all duration-200 flex items-center" onClick={() => { setTab(false) }}>
                        My Address
                        <EastIcon />
                    </button>
                </div>
            </div>
            <div className="absolute top-[5rem] left-1/2 -translate-x-1/2 md:hidden">
                <div className="flex gap-4">
                    <button className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${current === 0 ? 'border-orange-500' : ''}`} onClick={() => { setTab(true); setCurrent(0) }}>
                        My Account
                    </button>
                    <button className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${current === 1 ? 'border-orange-500' : ''}`} onClick={() => { setTab(false); setCurrent(1) }}>
                        My Address
                    </button>
                </div>
            </div>
            {tab && (
                <form
                    className=" h-fit flex flex-col w-fit justify-center items-center gap-4 p-4 rounded-sm"
                    onSubmit={formik.handleSubmit}
                >
                    <h2 className=" text-xl font-semibold">My Account</h2>
                    <div>
                        <TextField
                            error={formik.errors.name}
                            label='Name'
                            helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                            variant="standard"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="name"
                            value={formik.values.name}
                        />
                    </div>
                    <div>
                        <TextField
                            error={formik.errors.email}
                            label='Email'
                            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                            variant="standard"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                            value={formik.values.email}

                        />
                    </div>
                    <div>
                        <TextField
                            error={formik.errors.password}
                            label='password'
                            defaultValue="Hello World"
                            helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                            variant="standard"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                            value={formik.values.password}
                        />
                    </div>
                    <button
                        className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200"
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        UPDATE
                    </button>
                </form>
            )}
            {!tab && (
                <form
                    className=" h-fit flex flex-col w-fit justify-center items-center gap-4 p-4 rounded-sm"
                    onSubmit={addFormik.handleSubmit}
                >
                    <h2 className=" text-xl font-semibold">My Address</h2>
                    <div>
                        <TextField
                            error={addFormik.errors.house}
                            label='House'
                            defaultValue={user?.address?.house ? user.address.house : ""}
                            helperText={addFormik.errors.house && addFormik.touched.house ? addFormik.errors.house : ""}
                            variant="standard"
                            type="text"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="house"
                            value={addFormik.values.house}
                        />
                    </div>
                    <div>
                        <TextField
                            error={addFormik.errors.street}
                            label='Street'
                            defaultValue={user?.address?.street ? user.address.street : ""}
                            helperText={addFormik.errors.street && addFormik.touched.street ? addFormik.errors.street : ""}
                            variant="standard"
                            type="street"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="street"
                            value={addFormik.values.street}

                        />
                    </div>
                    <div>
                        <TextField
                            error={addFormik.errors.area}
                            label='Area'
                            defaultValue={user?.address?.area ? user.address.area : ""}
                            helperText={addFormik.errors.area && addFormik.touched.area ? addFormik.errors.area : ""}
                            variant="standard"
                            type="text"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="area"
                            value={addFormik.values.area}
                        />
                    </div>
                    <div>
                        <TextField
                            error={addFormik.errors.city}
                            label='City'
                            defaultValue={user?.address?.city ? user.address.city : ""}
                            helperText={addFormik.errors.city && addFormik.touched.city ? addFormik.errors.city : ""}
                            variant="standard"
                            type="text"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="city"
                            value={addFormik.values.city}
                        />
                    </div>
                    <div>
                        <TextField
                            error={addFormik.errors.state}
                            label='State'
                            defaultValue={user?.address?.state ? user.address.state : ""}
                            helperText={addFormik.errors.state && addFormik.touched.state ? addFormik.errors.state : ""}
                            variant="standard"
                            type="text"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="state"
                            value={addFormik.values.state}
                        />
                    </div>
                    <div>
                        <TextField
                            error={addFormik.errors.country}
                            label='Country'
                            defaultValue={user?.address?.country ? user.address.country : ""}
                            helperText={addFormik.errors.country && addFormik.touched.country ? addFormik.errors.country : ""}
                            variant="standard"
                            type="text"
                            onChange={addFormik.handleChange}
                            onBlur={addFormik.handleBlur}
                            name="country"
                            value={addFormik.values.country}
                        />
                    </div>

                    <button
                        className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200 "
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        UPDATE
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateAccount;
