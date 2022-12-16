
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Formik, FieldArray, Field, Form, ErrorMessage, setNestedObjectValues } from "formik";
import * as yup from 'yup'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Error from "../../utils/error";
import SuccessModel from "../../utils/successModel";
import ErrorModel from "../../utils/errorModel";
import { State } from "../../utils/types";
import { useCreateRating } from "../../hooks/useRating";
import Link from "next/link";
import WestIcon from '@mui/icons-material/West';
import { useRouter } from "next/router";
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';




const CreateCollection = ({ productId }) => {
  (productId)
  const [images, setImages] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const removeImage = (image) => {
    const imgs = images.filter((img) => {
      return img != image
    })
    setImages(imgs)
  }

  const [value, setValue] = useState("")

  const [er, setEr] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setEr(false)
    }, 2000)
  }, [er])

  const categories = useSelector((state) => state.auth.categories)

  const user = useSelector((state: State) => state.auth.user)

  //? (f)
  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    (e.target.files)
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
      setImages([...images, response.data])
    } catch (err) {
    }
  };

  const onSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  }


  const onError = () => {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 2000)
  }

  const { mutate: createRating, error: err } = useCreateRating(onSuccess, onError);

  const submitHandler = async (values) => {
    const rating = {
      img: images,
      userId: user._id,
      productId: productId,
      rating: value,
      ...values
    };
    if (value) {
      createRating(rating);
    } else {
      setEr(true)
    }
  };

  const validationObject = yup.object({
    message: yup.string().min(20, "description should be atleast 20 characters long").required("message is required"),
  })

  const initialValues = {
    message: ''
  }
  return (
    <div className="flex min-h-screen gap-10 text-xs mx-auto w-fit justify mb-20 mt-[6rem]">
      {success && <SuccessModel>rating uploaded successfully</SuccessModel>}
      {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
      {er && <ErrorModel>please provide Rating</ErrorModel>}
      <div>
        <Link href={`/product/${productId[0]}`} className=' flex h-fit items-center gap-1 hover:gap-4 transition-all duration-200'>
          <WestIcon />
          <p>Back to Home</p>
        </Link>
      </div>
      <div className="flex gap-10">

        <div className=" flex flex-col gap-10">
          <h2 className=" text-xl font-semibold text-center">Add Rating</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}

            //* by default
            validateOnBlur={true}
            validateOnChange={true}

            validationSchema={validationObject}>
            {
              (props) => {
                (props)
                return (
                  <Form
                    className=" flex flex-col justify-center items-center gap-4 w-[300px]"
                  >
                    <div className=" w-full">
                      <Field
                        type="text"
                        className="w-full bg-white border-b  rounded-sm px-4 py-2 outline-none"
                        placeholder="message"
                        name="message"
                      />
                      <ErrorMessage name="message" component={Error} />
                    </div>
                    <Rating
                      name="simple-controlled"
                      value={props.values.rating}
                      precision={.5}
                      onChange={(event, newValue) => {
                        setValue(newValue)
                      }}
                    />
                    <button
                      className=" text-white border active:translate-y-4  disabled:opacity-50 bg-gray-800 px-10 py-2 rounded-sm hover:text-black hover:bg-transparent hover:border hover:border-black transition-all duration-200"
                      type="submit"
                      disabled={!props.isValid}
                    >
                      UPDATE
                    </button>
                  </Form>
                )
              }
            }
          </Formik>
        </div>
        <div className={`flex gap-10 justify-center overflow-hidden relative  ${!images ? "items-center" : ""} mt-10 flex-col h-fit w-fit`}>
          <div className=" bg-white p-2 opacity-80 flex items-center gap-4 border-b border-green-500 w-fit">
            <p>Upload images</p>
            <EditIcon className=" cursor-pointer" />
            <div className=" absolute opacity-0 cursor-pointer">
              <input type="file" onChange={imageHandler} />
            </div>
          </div>
          <div className="grid grid-cols-3">
            {images && images.map((image, index) => (
              <div key={index} className='w-fit relative'>
                <img src={image} className='border-none w-[100px] h-[150px]' />
                <button className="absolute top-0 right-0" onClick={() => removeImage(image)}><CloseIcon /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default CreateCollection;

export async function getServerSideProps(context) {
  return {
    props: { productId: context.params.product }
  }
}