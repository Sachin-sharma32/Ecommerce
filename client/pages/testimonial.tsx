/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Error from "../utils/error";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import { State } from "../utils/types";
import { useCreateCategory } from "../hooks/useCategoy";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateTestimonial } from "../hooks/useTestimonial";

const CreateCategory = () => {
    const [image, setImage] = useState();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const user = useSelector((state: State) => state.auth.user);

    //? (f)
    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(
                "http://localhost:8000/api/v1/uploads",
                formData,
                config
            );
            setImage(response.data);
        } catch (err) {
            err;
        }
    };

    const onSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };

    const onError = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
    };

    const { mutate: createTestimonial, error: err } = useCreateTestimonial(
        onSuccess,
        onError
    );

    const submitHandler = async (values) => {
        const testimonial = {
            img: image,
            user: user?._id,
            ...values,
        };
        createTestimonial(testimonial);
    };

    const removeImg = () => {
        setImage(null);
    };

    const validationObject = yup.object({
        message: yup
            .string()
            .min(20, "message should be atleast 20 characters long")
            .required(),
    });

    const initialValues = {
        message: "",
    };
    return (
        <div className="flex flex-col sm:flex-row min-h-screen gap-10 text-xs justify-center items-center mb-20 mx-auto bg-gradient-to-r from-gray-50 to-gray-100">
            {success && (
                <SuccessModel>Thank You For Sharing Your Story</SuccessModel>
            )}
            {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
            <div className=" flex flex-col gap-10 w-[500px] items-center">
                <div>
                    <h2 className=" text-xl font-semibold text-center">
                        Your Story
                    </h2>
                    <p className=" text-gray-500">
                        Help our business grow by sharing your experience
                        shopping with us.
                    </p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                    //* by default
                    validateOnBlur={true}
                    validateOnChange={true}
                    validationSchema={validationObject}
                >
                    {(props) => {
                        return (
                            <Form className=" flex flex-col justify-center items-center gap-4 w-[500px]">
                                <div className=" w-full">
                                    <Field
                                        as="textarea"
                                        type="text"
                                        rows={5}
                                        minLength={10}
                                        type="text"
                                        className=" bg-white outlinne-none p-2 resize-none rounded-sm focus:shadow-xl w-[500px] transition-all duration-500 border-b-4 border-transparent focus:border-gray-500 focus:invalid:border-red-500"
                                        placeholder="Story"
                                        name="message"
                                    />
                                    <ErrorMessage
                                        name="desc"
                                        component={Error}
                                    />
                                </div>
                                <button
                                    className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200"
                                    type="submit"
                                    disabled={!props.isValid}
                                >
                                    PUBLISH
                                </button>
                            </Form> 
                        );
                    }}
                </Formik>
            </div>
            <div
                className={`flex gap-10 overflow-hidden relative  mt-10 flex-col min-h-[300px] min-w-[300px]`}
            >
                <div className=" p-2 opacity-80 flex items-center gap-4 border-b border-green-500 w-fit">
                    <p>Share an Image</p>
                    <EditIcon className=" cursor-pointer" />
                    <div className=" absolute opacity-0 cursor-pointer">
                        <input type="file" onChange={imageHandler} />
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    {image && (
                        <div className="relative">
                            <img
                                src={image}
                                className="border-none w-[100px] h-[150px]"
                            />
                            <button onClick={removeImg}>
                                <CloseIcon className=" absolute top-0 right-0 cursor-pointer text-sm" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
