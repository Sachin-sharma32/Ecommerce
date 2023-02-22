//? formik
//! nested objects (20)

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useCreateProduct } from "../hooks/useProduct";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Error from "../utils/error";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import { State } from "../utils/types";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UpdateAccount = () => {
    const [images, setImages] = useState([]);

    const [coverImg, setCoverImg] = useState(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const user = useSelector((state: State) => state.auth.user);

    const categories = useSelector((state) => state.auth.categories);
    const collections = useSelector((state) => state.auth.collections);

    //? (f)
    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files;
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
            setImages([...images, response.data]);
        } catch (err) {
            err;
        }
    };
    const coverImgHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files;
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
            setCoverImg(response.data);
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

    const { mutate: createProduct, error: err } = useCreateProduct(
        onSuccess,
        onError
    );

    const submitHandler = async (values) => {
        const product = {
            img: images,
            coverImg: coverImg,
            featured: isChecked,
            user: user?._id,
            collectionName: values.collection,
            ...values,
        };
        createProduct(product);
    };
    const SIZES = /xs|s|m|l|xl/;
    const COLORS =
        /red|pink|black|gray|orange|yellow|green|indigo|purple|white|blue/;

    const validationObject = yup.object({
        title: yup
            .string()
            .min(3, "title should atleast 3 characters long")
            .required("title is required"),
        desc: yup
            .string()
            .min(20, "description should be atleast 20 characters long")
            .required("desc is required"),
        price: yup
            .number()
            .min(200, "price should be atleast Rs.200")
            .required("price is required"),
        discountPrice: yup.number().min(200, "price should be atleast Rs.200"),
        offer: yup.string(),
        category: yup.string().required("category is required"),
        collection: yup.string().required("category is required"),
        size: yup
            .array()
            .of(
                yup
                    .string()
                    .matches(SIZES, "provide valid size")
                    .required("size field is required")
            )
            .min(2, "minimun 2 sizes are required"),
        color: yup
            .array()
            .of(
                yup
                    .string()
                    .matches(COLORS, " provide valid color")
                    .required("size field is required")
            )
            .min(1),
    });

    const initialValues = {
        title: "",
        desc: "",
        price: "",
        category: "",
        collection: "",
        size: [""],
        color: [""],
        discountPrice: "",
        offer: "",
    };

    const removeImg = (index) => {
        const filter = images.filter((img, i) => {
            return i !== index;
        });
        setImages(filter);
    };

    const removeCoverImg = () => {
        setCoverImg("");
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen gap-2 xl:gap-10 text-xs w-full justify-evenly mb-20">
            {success && (
                <SuccessModel>product created successfully</SuccessModel>
            )}
            {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
            <div className=" flex flex-col gap-10 items-center">
                <h2 className=" text-xl font-semibold text-center">
                    Create Product
                </h2>
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
                            <Form className=" flex flex-col justify-center items-center gap-4 w-[300px]">
                                <div className="w-full">
                                    <Field
                                        type="text"
                                        className="w-full border-b rounded-sm px-4 py-2 outline-none bg-inherit"
                                        placeholder="Title"
                                        name="title"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component={Error}
                                    />
                                </div>
                                <div className=" w-full">
                                    <Field
                                        type="text"
                                        className="w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                                        placeholder="Description"
                                        name="desc"
                                    />
                                    <ErrorMessage
                                        name="desc"
                                        component={Error}
                                    />
                                </div>
                                <div className=" w-full">
                                    <Field
                                        type="number"
                                        className=" w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                                        placeholder="price"
                                        name="price"
                                    />
                                    <ErrorMessage
                                        name="price"
                                        component={Error}
                                    />
                                </div>
                                <div className=" w-full">
                                    <Field
                                        type="number"
                                        className=" w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                                        placeholder="Discount Price (optional)"
                                        name="discountPrice"
                                    />
                                    <ErrorMessage
                                        name="discountPrice"
                                        component={Error}
                                    />
                                </div>
                                <div className=" w-full">
                                    <Field
                                        type="text"
                                        className=" w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                                        placeholder="Offer (optional)"
                                        name="offer"
                                    />
                                    <ErrorMessage
                                        name="offer"
                                        component={Error}
                                    />
                                </div>
                                <div className="flex gap-10 mb-10">
                                    <div className=" flex gap-4">
                                        <p className=" border-b border-green-500">
                                            Category
                                        </p>
                                        <select
                                            name="category"
                                            value={props.values.category}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            className=" bg-white"
                                        >
                                            <option value="" disabled>
                                                select
                                            </option>
                                            {categories?.map(
                                                (category, index) => (
                                                    <>
                                                        <option
                                                            key={category._id}
                                                            value={
                                                                category.title
                                                            }
                                                        >
                                                            {category.title}
                                                        </option>
                                                    </>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className=" flex gap-4">
                                        <p className=" border-b border-green-500">
                                            Collection
                                        </p>
                                        <select
                                            name="collection"
                                            value={props.values.collection}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            className=" bg-white"
                                            disabled={!props.values.category}
                                        >
                                            <option value="" disabled>
                                                select
                                            </option>
                                            {collections
                                                ?.filter(
                                                    (collection) =>
                                                        collection.category ===
                                                        props.values.category
                                                )
                                                .map((collection, index) => (
                                                    <>
                                                        <option
                                                            key={collection._id}
                                                            value={
                                                                collection.title
                                                            }
                                                        >
                                                            {collection.title}
                                                        </option>
                                                    </>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className=" border rounded-sm p-4 relative w-full flex justify-center">
                                    <label className=" font-bold absolute -top-2 bg-white">
                                        Size
                                    </label>
                                    <FieldArray name="size">
                                        {(props) => {
                                            const { push, remove, form } =
                                                props;
                                            const { values } = form;
                                            return (
                                                <div className="flex flex-col gap-1">
                                                    {values.size.map(
                                                        (item, index) => (
                                                            <div key={index}>
                                                                <div
                                                                    key={index}
                                                                    className="flex gap-2"
                                                                >
                                                                    <Field
                                                                        name={`size[${index}]`}
                                                                        className=" bg-inherit border-b  rounded-sm px-4 py-2 outline-none"
                                                                    />
                                                                    {index >
                                                                        0 && (
                                                                        <button
                                                                            onClick={() =>
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className=" rounded-full"
                                                                        >
                                                                            <RemoveIcon className=" text-gray-400" />
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={() =>
                                                                            push(
                                                                                ""
                                                                            )
                                                                        }
                                                                        className=" rounded-full"
                                                                    >
                                                                        <AddIcon className=" text-gray-400" />
                                                                    </button>
                                                                </div>
                                                                <ErrorMessage
                                                                    name={`size[${index}]`}
                                                                    component={
                                                                        Error
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </FieldArray>
                                </div>
                                <div className=" border rounded-sm p-4 relative w-full flex justify-center">
                                    <label className=" font-bold absolute -top-2 bg-white">
                                        Colors
                                    </label>
                                    <FieldArray name="color">
                                        {(props) => {
                                            const { push, remove, form } =
                                                props;
                                            const { values } = form;
                                            return (
                                                <div className="flex flex-col gap-1">
                                                    {values.color.map(
                                                        (item, index) => (
                                                            <div key={index}>
                                                                <div
                                                                    key={index}
                                                                    className="flex gap-2"
                                                                >
                                                                    <Field
                                                                        name={`color[${index}]`}
                                                                        className=" bg-inherit border-b  rounded-sm px-4 py-2 outline-none"
                                                                    />
                                                                    {index >
                                                                        0 && (
                                                                        <button
                                                                            onClick={() =>
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className=" rounded-full"
                                                                        >
                                                                            <RemoveIcon className=" text-gray-400" />
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={() =>
                                                                            push(
                                                                                ""
                                                                            )
                                                                        }
                                                                        className=" rounded-full"
                                                                    >
                                                                        <AddIcon className=" text-gray-400" />
                                                                    </button>
                                                                </div>
                                                                <ErrorMessage
                                                                    name={`color[${index}]`}
                                                                    component={
                                                                        Error
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </FieldArray>
                                </div>
                                <div className="flex items-center w-full justify-end">
                                    <p>Featured</p>
                                    <Checkbox
                                        size="small"
                                        onChange={() =>
                                            setIsChecked((current) => !current)
                                        }
                                    />
                                </div>
                                <button
                                    className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200"
                                    type="submit"
                                    disabled={!props.isValid}
                                >
                                    UPDATE
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <div
                className={`items-start flex sm:flex-col xl:flex-row justify-evenly w-fit overflow-hidden relative  ${
                    !images ? "items-center" : ""
                } mt-10 h-fit w-fit`}
            >
                <div className=" p-2 opacity-80 flex items-start gap-4 w-[200px] xl:w-[300px] flex-col">
                    <div className="flex items-center gap-4 w-fit h-14 border-b border-green-500 p-2">
                        <p>Upload images</p>
                        <IconButton>
                            <input
                                className=" w-10 absolute opacity-0"
                                type="file"
                                onChange={imageHandler}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        {images &&
                            images.map((image, index) => (
                                <div className=" relative w-full" key={image}>
                                    <img
                                        src={image}
                                        className="border-none w-[100px] h-[100px]"
                                    />
                                    <button
                                        onClick={() => {
                                            removeImg(index);
                                        }}
                                    >
                                        <CloseIcon className=" absolute top-0 right-0 cursor-pointer text-sm" />
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="p-2 opacity-80 flex items-start gap-4  flex-col w-[200px] xl:w-[300px] justify-center">
                    <div className="flex items-center gap-4 w-fit border-b h-14 border-green-500 p-2">
                        <p>Upload Cover</p>
                        <IconButton>
                            <input
                                className=" absolute w-10 opacity-0"
                                type="file"
                                onChange={coverImgHandler}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </div>
                    <div className="grid grid-cols-2">
                        {coverImg && (
                            <div className=" relative w-full">
                                <img
                                    key={coverImg}
                                    src={coverImg}
                                    className="border-none w-[100px] h-[100px]"
                                />
                                <button onClick={removeCoverImg}>
                                    <CloseIcon className=" absolute top-0 right-0 cursor-pointer text-sm" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;
