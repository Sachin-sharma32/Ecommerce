import React from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../app/slices";

const HeaderCard = ({ card }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={`${card.bg} w-[100%] h-[100%] relative flex items-center justify-center gap-28 p-40`}
        >
            <img src={`${card.img}`} width={200} height={200} alt="img" />
            <div className=" flex flex-col gap-4 items-center">
                <h2 className=" text-5xl font-bold text-gray-700">
                    {card.title}
                </h2>
                <h4>{card.desc}</h4>
                <button
                    className=" bg-blue-400 px-10 py-2 w-fit rounded-lg hover:bg-blue-200 transition-all duration-200"
                    onClick={() => {
                        dispatch(emptyCart());
                    }}
                >
                    SHOP NOW
                </button>
            </div>
        </div>
    );
};

export default HeaderCard;
