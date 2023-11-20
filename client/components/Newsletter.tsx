import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import SuccessModel from "../utils/successModel";
import ErrorModel from "../utils/errorModel";
import Link from "next/link";
import Button3 from "../utils/Button3";

const Newsletter = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 3000);
  }, [success, error]);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const user = useSelector((state) => state.auth.user);
  return (
    <div className=" bg-gray-200 py-10 flex flex-col justify-center items-center p-4 md:p-40 mb-0 gap-10 checkout__background text-normal">
      {success && <SuccessModel>{message}</SuccessModel>}
      {error && <ErrorModel>{message}</ErrorModel>}
      <div className="text-white flex flex-col gap-4">
        <h3 className="text-2xl  text-center font-monumentRegular">
          Sign up to be the first to know about what&npsp;s new on Shremz
        </h3>
        <div className="flex">
          <input
            type="text"
            className=" p-3 w-full bg-white"
            placeholder="Email Address"
          />
          <Button3
            title={"Subscribe"}
            className={"bg-[#1e4732] text-white"}
            href={"/"}
          />
        </div>
        <p className="w-[70%] mx-auto text-center">
          By clicking Subscribe you are confirming the you agree with our Terms
          and Conditions
        </p>
      </div>
    </div>
  );
};

export default React.memo(Newsletter);
