/* eslint-disable @next/next/no-img-element */
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
    addProducts,
    setCategories,
    setCollections,
    setToken,
} from "../app/slices";
import PersonIcon from "@mui/icons-material/Person";
import { setUser } from "../app/slices";
import { useRefresh, useGetMe, useLogout } from "../hooks/useAuth";
import { useGetCart } from "../hooks/useCart";
import { signOut, useSession } from "next-auth/react";
import { ProductWithQuantity, State, User } from "../utils/types";
import Smooth from "../utils/smooth";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useGetCategories } from "../hooks/useCategoy";
import { useGetCollections } from "../hooks/useCollection";
import { useGetProducts } from "../hooks/useProduct";
import { useGetWishList } from "../hooks/useWishList";
import { useGetRatings } from "../hooks/useRating";
import { useGetOrders } from "../hooks/useOrder";

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const wishList = useSelector((state: State) => state.auth.wishList);

    const onProductSuccess = (products) => {
        dispatch(addProducts(products));
    };
    let {
        isLoading,
        isError,
        error,
        data: products,
    } = useGetProducts(onProductSuccess);

    const [search, setSearch] = useState("");

    const onCatSuccess = (categories) => {
        dispatch(
            setCategories(
                categories.map((category) => {
                    return category;
                })
            )
        );
    };

    const { data: categories } = useGetCategories(onCatSuccess);

    const clientCart = useSelector((state: State) => state.auth.cart);

    const { data: session } = useSession();

    const onCollectionSuccess = (collections) => {
        dispatch(
            setCollections(
                collections.map((collection) => {
                    return collection;
                })
            )
        );
    };

    const { data: collections } = useGetCollections(onCollectionSuccess);

    const onSuccess = (accessToken: string) => {
        dispatch(setToken(accessToken));
    };

    const token = useSelector((state: State) => state.auth.accessToken);
    // //? 6
    let decodedJwt;
    if (token) {
        decodedJwt = jwtDecode(token);
    }
    //? 5 - refresh access token after expiration
    const { data: accessToken } = useRefresh(onSuccess);

    const { mutate: logOut } = useLogout();

    const logoutUser = async () => {
        dispatch(setToken(null));
        signOut();
        logOut();
    };

    const onUserSuccess = (user: User) => {
        console.log("user");
        dispatch(setUser(user));
    };
    const { data: user } = useGetMe(onUserSuccess);

    useGetCart(user?._id);
    useGetWishList(user?._id);
    useGetRatings();
    useGetOrders();

    let cartSize: number;
    if (clientCart) {
        if (clientCart.products.length === 0) {
            cartSize = 0;
        } else {
            cartSize = clientCart.products.reduce(
                (acc: number, product: ProductWithQuantity) => {
                    return acc + product.quantity;
                },
                0
            );
        }
    }

    let wishListSize: number;
    if (wishList) {
        if (wishList.products.length === 0) {
            wishListSize = 0;
        } else {
            wishListSize = wishList.products.length;
        }
    }

    const sumbitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    };

    const headerRef = useRef(null);
    // headerRef.current.classList.add(
    //     "translate-x-[100px]"
    // );

    return (
        <div className=" flex flex-col  justify-center items-center bg-black text-white  rounded-t-none  z-50 backdrop-blur-lg text-sm  font-extralight mx-auto w-[100%]">
            <div
                className="bg-black h-10 w-full text-white text-lg flex justify-center items-center font-bold"
                ref={headerRef}
            >
                sachin
            </div>
            <div className="mx-auto flex justify-between w-[100%] py-4 bg-[#262626] px-10">
                <div className="flex gap-2 items-center">
                    <Link href="/">
                        <img src="/myntra.png" className=" w-20" alt="" />
                    </Link>
                    <div>Categories </div>
                    <div>Categories </div>
                </div>

                <div className=" flex gap-4">
                    <form
                        className=" bg-white text-black border w-60 justify-between rounded-lg  flex items-center py-1 px-2 gap-2 rounded-lg"
                        onSubmit={sumbitHandler}
                    >
                        <input
                            type="text"
                            className=" bg-white outline-none w-52  placeholder:text-xs tracking-wide"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            placeholder="search for product or category text-black"
                        />
                        <button type="submit" className="text-black">
                            <SearchIcon />
                        </button>
                    </form>
                    <div className=" flex gap-4 items-center">
                        {!token && (
                            <Smooth className="flex gap-4">
                                <Link href="/register" className="">
                                    REGISTER
                                </Link>
                                <Link href="/signIn" className="">
                                    SIGN IN
                                </Link>
                            </Smooth>
                        )}
                        {token && (
                            <Smooth className="flex justify-center items-center gap-4">
                                <button>
                                    <div className="flex items-center gap-2 text-xs user-icon relative rounded-lg">
                                        <PersonOutlineOutlinedIcon />
                                        <ul className=" overflow-hidden rounded-lg z-50 absolute top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg flex flex-col text-sm user-links font-normal text-gray-800">
                                            <li className=" capitalize italic w-40 bg-gray-200 p-4 cursor-default text-gray-400">
                                                Hi, {user?.name}
                                            </li>
                                            <Link href="/account">
                                                <li className=" hover:bg-gray-200 w-40 p-4">
                                                    My Account
                                                </li>
                                            </Link>
                                            <Link
                                                href="/testimonial"
                                                className="bg-green-200"
                                            >
                                                <li className=" hover:bg-gray-200 w-40 p-4">
                                                    Share You Story
                                                </li>
                                            </Link>
                                            <Link href="/myOrders">
                                                <li className=" hover:bg-gray-200 w-40 p-4">
                                                    My Orders
                                                </li>
                                            </Link>
                                            <Link href="/wishList">
                                                <li className=" hover:bg-gray-200 w-40 p-4">
                                                    My Wishlist
                                                </li>
                                            </Link>
                                            <button onClick={logoutUser}>
                                                <li className=" hover:bg-gray-200 w-40 p-4">
                                                    Logout
                                                </li>
                                            </button>
                                        </ul>
                                    </div>
                                </button>
                                <Link href="/cart" className=" relative">
                                    <div className=" hover:scale-125 transition-all duration-200">
                                        <ShoppingBagOutlinedIcon />
                                    </div>
                                    <div className=" absolute bg-white w-6 h-6 flex justify-center items-center -top-4 -right-2 rounded-full text-black">
                                        {cartSize ? cartSize : 0}
                                    </div>
                                </Link>
                                <Link href="/wishList" className=" relative">
                                    <div className=" hover:scale-125 transition-all duration-200">
                                        <FavoriteBorderOutlinedIcon />
                                    </div>
                                    <div className=" absolute bg-white w-6 h-6 flex justify-center items-center -top-4 -right-2 rounded-full text-black">
                                        {wishListSize ? wishListSize : 0}
                                    </div>
                                </Link>
                            </Smooth>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
