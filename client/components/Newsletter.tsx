import React from "react";
import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
    return (
        <div className=" bg-green-100 my-10 flex flex-col justify-center items-center p-40 mb-0 gap-10 text-sm sm:text-base w-[100%]">
            <h2 className=" text-xl sm:text-5xl font-semibold">
                Signup to our newsletter
            </h2>
            <div className="flex gap-0 bg-white w-80 sm:w-96 h-auto">
                <h4 className=" p-2 border-2 border-black">Your email</h4>
                <input
                    type="email"
                    placeholder="sachin2sharma001@gmail.com"
                    autoComplete="false"
                    className=" bg-white w-[100%] px-2 outline-none"
                />
                <div className=" p-2 cursor-pointer border flex items-center">
                    <SendIcon />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Newsletter);
