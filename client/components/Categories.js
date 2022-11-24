import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
    const cards = [
        {
            title: "WEDDING",
            img: "/img-9.jpg",
        },
        {
            title: "SHIRTS",
            img: "/img-10.jpg",
        },
        {
            title: "PARTY",
            img: "/img-8.jpg",
        },
    ];
    return (
        <div className=" px-10 pt-4 flex gap-4 justify-center">
            {cards.map((card, index) => (
                <CategoryCard key={index} card={card} />
            ))}
        </div>
    );
};

export default Categories;
