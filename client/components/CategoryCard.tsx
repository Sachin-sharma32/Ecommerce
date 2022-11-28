import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AppProps {
    card: {
        title: string,
        img: string
    }
}

const CategoryCard = ({ card }: AppProps) => {
    return (
        <div className=" relative text-xs sm:text-base">
            <Image src={card.img} width={400} height={400} alt="img" />
            <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-center flex flex-col gap-4 items-center">
                <h2 className=" text-3xl font-semibold text-gray-400">
                    {card.title}
                </h2>
                <Link href={`/category/${card.title}`}>
                    {" "}
                    <button className=" bg-white px-10 py-2 w-fit rounded-lg hover:bg-gray-300 transition-all duration-200">
                        SHOP NOW
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default React.memo(CategoryCard);
