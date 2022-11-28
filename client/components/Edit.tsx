/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateProduct } from "../hooks/useProduct";
import axios from "axios";

const Edit = ({ product, setSelectedProduct }) => {
    const [image, setImage] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [colors, setColors] = useState(null);

    useEffect(() => {
        setTitle(product.title);
        setDescription(product.desc);
        setPrice(product.price);
        setCategories(product.category);
        setSizes(product.size);
        setColors(product.color);
        setImage(product.img);
    }, [product]);

    const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const catString = e.target.value;
        const catArray = catString.split(",");
        setCategories(catArray);
    };
    const sizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sizeString = e.target.value;
        const sizeArray = sizeString.split(",");
        setSizes(sizeArray);
    };
    const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sizeString = e.target.value;
        const sizeArray = sizeString.split(",");
        setColors(sizeArray);
    };

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
            response.data;
        } catch (err) {
            err;
        }
    };

    const { mutate: updateProduct } = useUpdateProduct(product._id);
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const product = {
            title,
            desc: description,
            img: image,
            category: categories,
            price,
            size: sizes,
            color: colors,
        };
        updateProduct(product);
    };



    return (
        <div className="flex flex-col justify-center items-center pt-10 gap-10 shadow-2xl w-fit p-10 rounded-lg backdrop-blur-10 absolute top-0 z-4 backdrop-blur-3xl">
            <button
                onClick={() => {
                    setSelectedProduct(null);
                }}
            >
                <CloseIcon className=" absolute z-10 top-2 left-2" />
            </button>
            <h2 className=" text-4xl font-semibold">Update: {product._id}</h2>
            <form
                className=" flex flex-col w-fit justify-center items-center gap-4"
                onSubmit={submitHandler}
            >
                <div className=" h-52 w-52 flex justify-center rounded-full overflow-hidden relative">
                    {image ? (
                        <img src={image} width={300} height={300} />
                    ) : (
                        <img
                            src={product.img}
                            width={300}
                            height={200}
                            className=""
                        />
                    )}
                    <div className=" absolute bottom-0 bg-white p-2 rounded-full opacity-80">
                        <EditIcon className=" text-black cursor-pointer" />
                    </div>
                    <input
                        type="file"
                        className=" absolute bottom-0 opacity-0 cursor-pointer"
                        onChange={imageHandler}
                    />
                    <div className=" absolute bottom-0 opacity-0 cursor-pointer"></div>
                </div>
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Description"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    value={description}
                />
                <input
                    type="number"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Price"
                    onChange={(e) => {
                        setPrice(+(e.target.value));
                    }}
                    value={price}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Categories"
                    onChange={categoryHandler}
                    value={categories}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Sizes"
                    onChange={sizeHandler}
                    value={sizes}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Colors"
                    onChange={colorHandler}
                    value={colors}
                />
                <button
                    className=" bg-blue-400 px-10 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 w-full"
                    type="submit"
                >
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default Edit;
