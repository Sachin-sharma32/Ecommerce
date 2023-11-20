/* eslint-disable @next/next/no-img-element */
import React from "react";
import Smooth from "../utils/smooth";
import Link from "next/link";

interface AppProps {
  card: {
    title: string;
    desc: string;
    img: string;
    bg: string;
  };
}

const HeaderCard = ({ card }: AppProps) => {
  return (
    <Link href={`/search/${card.title}`}>
      <div className={`flex justify-center items-center text-x`}>
        <div className=" w-[300px] sm:w-[300px] pointer-events-none relative">
          <img
            src={`${card.img[0]}`}
            className=" w-[100%] sm:w-[100p%] pointer-events-none"
            alt="img"
          />
          <h2 className=" text-xl font-bold text-black w-full absolute bottom-2 bg-white opacity-75 text-center">
            {card.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default HeaderCard;
