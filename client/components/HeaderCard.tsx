/* eslint-disable @next/next/no-img-element */
import React from "react";

interface AppProps {
    card: {
        title: string,
        desc: string,
        img: string,
        bg: string
    }
}

const HeaderCard = ({ card }: AppProps) => {
    return (
        <div
            className={`${card.bg} w-[100%] h-[100%] relative flex items-center justify-center gap-10 sm:gap-28 p-40 text-sm sm:text-lg`}
        >
            <img
                src={`${card.img}`}
                className=" w-[100px] sm:w-[200px]"
                alt="img"
            />
            <div className=" flex flex-col gap-4 items-center">
                <h2 className=" text-5xl font-bold text-gray-700">
                    {card.title}
                </h2>
                <h4>{card.desc}</h4>
                <button
                    className=" bg-blue-400 px-10 py-2 w-fit rounded-lg hover:bg-blue-200 transition-all duration-200"
                >
                    SHOP NOW
                </button>
            </div>
        </div>
    );
};

export default HeaderCard;
