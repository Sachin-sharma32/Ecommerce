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
import { useCreateCategory } from "../hooks/useCategoy";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const CreateCategory = () => {
  const [images, setImages] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const user = useSelector((state: State) => state.auth.user);

  //? (f)
  const imageHandler: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
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

  const { mutate: createCategory, error: err } = useCreateCategory(
    onSuccess,
    onError
  );

  const submitHandler = async (values) => {
    const category = {
      img: images,
      user: user?._id,
      ...values,
    };
    createCategory(category);
  };

  const removeImg = (index) => {
    const filter = images.filter((img, i) => {
      return i !== index;
    });
    setImages(filter);
  };

  const validationObject = yup.object({
    title: yup
      .string()
      .min(3, "title should atleast 3 characters long")
      .required(),
    desc: yup
      .string()
      .min(20, "description should be atleast 20 characters long")
      .required(),
  });

  const initialValues = {
    title: "",
    desc: "",
  };
  return (
    <div className="flex flex-col sm:flex-row min-h-screen gap-10 text-normal max-w-[1200px] w-fit mb-20 items-center sm:items-start">
      {success && <SuccessModel>category created successfully</SuccessModel>}
      {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
      <div className=" flex flex-col gap-10">
        <h2 className=" text-xl font-semibold text-center">Create Category</h2>
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
                  <ErrorMessage name="title" component={Error} />
                </div>
                <div className=" w-full">
                  <Field
                    type="text"
                    className="w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                    placeholder="Description"
                    name="desc"
                  />
                  <ErrorMessage name="desc" component={Error} />
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
        className={`flex gap-10 justify-center overflow-hidden relative  ${
          !images ? "items-center" : ""
        } mt-10 flex-col h-fit w-fit`}
      >
        <div className=" bg-white p-2 opacity-80 flex items-center gap-4 border-b border-green-500 w-fit">
          <p>Upload images</p>
          <IconButton>
            <input
              type="file"
              onChange={imageHandler}
              className=" w-10 absolute opacity-0"
            />
            <PhotoCamera />
          </IconButton>
        </div>
        <div className="grid grid-cols-3">
          {images &&
            images.map((image, index) => (
              <div key={image} className="relative">
                <img src={image} className="border-none w-[100px] h-[150px]" />
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
    </div>
  );
};

export default CreateCategory;
