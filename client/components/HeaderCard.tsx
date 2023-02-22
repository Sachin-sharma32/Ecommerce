/* eslint-disable @next/next/no-img-element */
import React from "react";
import Smooth from "../utils/smooth";

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
            className="flex justify-center items-center z-10"
        >
            <div className=" w-full h-screen max-h-screen pointer-events-none relative">
                <img
                    // src={`${card.img[0]}`}
                    src="/burner-2.webp"
                    className=" w-full h-full pointer-events-none z-10"
                    alt="img"
                />
                <h2 className="  font-bold text-black h-fit w-fit px-10 left-32 -translate-y-1/2 absolute top-1/3 text-5xl flex flex-col gap-4">
                    <h3>{card.title}</h3>
                    <h3 className="text-2xl">But 2 pairs @253</h3>
                    <button className=" text-xl h-10 bg-black text-white px-4 py-1 w-52 rounded-lg !cursor-pointer">BUY NOW</button>
                </h2>
            </div>
        </div>
    );
};

export default HeaderCard;
