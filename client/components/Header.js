import React from "react";
import HeaderCard from "./HeaderCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const Header = () => {
    const [card, setCard] = useState(0);
    const increment = () => {
        if (card < 4) {
            setCard((current) => current + 1);
        } else {
            setCard(0);
        }
    };
    const decrement = () => {
        if (card > 0) {
            setCard((current) => current - 1);
        } else {
            setCard(4);
        }
    };
    const cards = [
        {
            title: "WOMEN'S TRANDING",
            desc: "Collection of the latest and the most stylish women's wear.",
            img: "/img-1.png",
            bg: "bg-blue-100",
        },
        {
            title: "SUMMER COLLECTION",
            desc: "Collection of the latest and the most stylish summer women's wear.",
            img: "/img-2.png",
            bg: "bg-pink-100",
        },
        {
            title: "CLASSY FASHION",
            desc: "Collection of the latest and the most classic women's wear.",
            img: "/img-3.png",
            bg: "bg-yellow-100",
        },
        {
            title: "AUTOMN COLLECTION",
            desc: "Collection of the latest and the most stylish authmn collection for woman.",
            img: "/img-4.png",
            bg: "bg-red-100",
        },
        {
            title: "MEN'S COLLECTION ",
            desc: "Collection of the latest and the most stylish men's wear.",
            img: "/img-5.png",
            bg: "bg-purple-100",
        },
    ];
    return (
        <div className=" mt-[4rem] flex w-[100%] h-[93vh] relative">
            <HeaderCard card={cards[card]} />
            <button onClick={decrement}>
                <ChevronLeftIcon className=" absolute top-1/2 left-[1rem] hover:scale-125 transition-all duration-200 -translate-y-1/2 bg-white w-10 h-10 rounded-full" />
            </button>
            <button onClick={increment}>
                <ChevronRightIcon className=" absolute top-1/2 right-[1rem] hover:scale-125 transition-all duration-200 -translate-y-1/2 bg-white w-10 h-10 rounded-full" />
            </button>
        </div>
    );
};

export default Header;
