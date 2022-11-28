/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useGetMe, useUpdateUser } from "../hooks/useAuth";

const UpdateAccount = () => {
    const [image, setImage] = useState(null);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { data: user } = useGetMe();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPassword(user.passwordConfirm);
            setEmail(user.email);
        }
    }, [user]);

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
            "http://localhost:8000/api/v1/uploads",
            formData,
            {
                headers: { "Content-Type": "multipart/formData" },
            }
        );
        if (response.statusText === "OK") {
            setImage(response.data);
        }
    };

    const { mutate: updateUser, data: updatedUser } = useUpdateUser(user._id);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            img: image,
        };

        updateUser(userData);
    };

    return (
        <div className="flex flex-col justify-center items-center pt-10 gap-10">
            <h2 className=" text-4xl font-semibold">Update Account</h2>
            <form
                className=" flex flex-col w-fit justify-center items-center gap-4"
                onSubmit={submitHandler}
            >
                <div className=" h-52 w-52 flex justify-center rounded-full overflow-hidden relative">
                    {image ? (
                        <img src={image} width={300} height={300}  alt=""/>
                    ) : (
                        <img
                            src={user.img}
                            width={300}
                            height={200}
                            className="" alt=""
                        />
                    )}
                    <div className=" absolute bottom-0 bg-white p-2 rounded-full opacity-80">
                        <EditIcon className=" text-black" />
                    </div>
                    <input
                        type="file"
                        className=" absolute bottom-0 opacity-0 cursor-pointer"
                        onChange={handleImage}
                    />
                </div>
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black w-96 h-16 rounded-lg px-4 py-2 outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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

export default UpdateAccount;
