import React from "react";

const SuccessModel = ({ text }) => {
    return (
        <div className=" fixed top-[4rem] mx-auto bg-green-500 p-10 rounded-lg text-white z-50">
            {text}
        </div>
    );
};

export default SuccessModel;
