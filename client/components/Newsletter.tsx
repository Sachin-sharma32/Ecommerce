import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Newsletter = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className=" bg-gray-200 my-10 flex flex-col justify-center items-center p-40 mb-0 gap-10 checkout__background text-xs">
            <div className=" w-[100%] flex flex-col gap-4 items-center">
                <div className="flex flex-col items-center cursor-pointer">
                    <h2 className=" text-lg sm:text-lg font-semibold text-center hover:scale-150 transition-all duration-500">
                        HAVE ANY QUERIES
                    </h2>
                    <p className=" text-[10px] text-gray-500">
                        Send us an email and we will do our best to solve your
                        problem.
                    </p>
                </div>
                <input
                    defaultValue={user?.email ? user?.email : ""}
                    type="email"
                    className=" bg-white outline-none p-2 rounded-lg focus:shadow-xl w-[500px] transition-all duration-500 border-b-4 border-transparent focus:border-gray-500 focus:invalid:border-red-500"
                    placeholder="sachin2sharma001@gmail.com"
                />
                <textarea
                    rows={5}
                    minLength={10}
                    type="text"
                    className=" bg-white outline-none p-2 resize-none rounded-lg focus:shadow-xl w-[500px] transition-all duration-500 border-b-4 border-transparent focus:border-gray-500 focus:invalid:border-red-500"
                    placeholder="Try to keep your query to the point and short for better response"
                />
                <div className=" flex items-center gap-4">
                    <button className=" bg-black text-white border transition-all duration-200 border-transparent hover:bg-transparent hover:text-black hover:border-black px-10 py-2">
                        {" "}
                        SEND MAIL
                    </button>
                    <p>OR</p>
                    <a href="/">
                        <img src="/fb.png" alt="" className=" w-10" />
                    </a>
                    <a href="/">
                        <img src="/insta.png" alt="" className=" w-10" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Newsletter);
