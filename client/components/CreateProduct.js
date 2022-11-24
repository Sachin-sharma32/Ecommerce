import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addProducts, fetchProducts } from "../app/slices";
import { useCreateProduct } from "../hooks/useProduct";
import { useGetMe } from "../hooks/useAuth";

const UpdateAccount = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const dispatch = useDispatch();

    const { data: user } = useGetMe();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [colors, setColors] = useState(null);

    const categoryHandler = (e) => {
        const catString = e.target.value;
        const catArray = catString.split(",");
        setCategories(catArray);
    };
    const sizeHandler = (e) => {
        const sizeString = e.target.value;
        const sizeArray = sizeString.split(",");
        setSizes(sizeArray);
    };
    const colorHandler = (e) => {
        const sizeString = e.target.value;
        const sizeArray = sizeString.split(",");
        setColors(sizeArray);
    };

    //? (f)
    const imageHandler = async (e) => {
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
            response.data;
        } catch (err) {
            err;
        }
    };

    const { mutate: createProduct } = useCreateProduct();

    const submitHandler = async (e) => {
        e.preventDefault();

        const product = {
            user: user._id,
            title,
            desc: description,
            img: image,
            category: categories,
            price,
            size: sizes,
            color: colors,
        };
        createProduct(product);
    };

    return (
        <div className="flex flex-col justify-center items-center pt-10 gap-10">
            <h2 className=" text-4xl font-semibold">Create Product</h2>
            <form
                className=" flex flex-col w-fit justify-center items-center gap-4"
                onSubmit={submitHandler}
            >
                <div className=" h-52 w-52 flex justify-center rounded-full overflow-hidden relative">
                    {image ? (
                        <img src={image} width={300} height={300} />
                    ) : (
                        <img
                            src="/img-7.jpg"
                            width={300}
                            height={200}
                            className=""
                        />
                    )}
                    <div className=" absolute bottom-0 bg-white p-2 rounded-full opacity-80">
                        <EditIcon className=" text-black cursor-pointer" />
                    </div>
                    <div className=" absolute bottom-0 opacity-0 cursor-pointer">
                        <input type="file" onChange={imageHandler} />
                    </div>
                </div>
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Description"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <input
                    type="number"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Price"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Categories"
                    onChange={categoryHandler}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Sizes"
                    onChange={sizeHandler}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Colors"
                    onChange={colorHandler}
                />
                <button
                    className=" bg-blue-400 px-10 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 w-full"
                    type="submit"
                >
                    CREATE
                </button>
            </form>
        </div>
    );
};

export default UpdateAccount;
