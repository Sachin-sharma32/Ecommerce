import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAddToCart, useGetCart } from "../hooks/useCart";
import { useSelector } from "react-redux";

const ProductListCard = ({ product }) => {
    const user = useSelector((state) => state.auth.user);
    const { data: cart } = useGetCart(user?._id);
    const { mutate: addToCart } = useAddToCart(cart?._id);
    const addProductToCart = () => {
        addToCart(product._id);
    };

    return (
        <div className=" relative product-card w-fit">
            <div className=" bg-blue-100 w-fit p-10 h-[20rem] flex justify-center items-center cursor-pointer hover:opacity-50">
                {product.img && (
                    <img src={product.img} width={200} height={200} alt="img" />
                )}
            </div>
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 product-icons opacity-0">
                <Link
                    href={`/product/${product._id}`}
                    className=" bg-white p-2 rounded-full cursor-pointer"
                >
                    <SearchIcon />
                </Link>
                <div className=" bg-white p-2 rounded-full cursor-pointer">
                    <FavoriteBorderIcon />
                </div>
                <div className=" bg-white p-2 rounded-full cursor-pointer">
                    <button onClick={addProductToCart}>
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;
