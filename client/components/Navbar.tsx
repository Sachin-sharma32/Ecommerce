/* eslint-disable @next/next/no-img-element */
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";

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
import React, { useEffect, useState } from "react";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [hiddenMenu, setHiddenMenu] = useState(false);

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
    setShowSearch(false);
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  const menuItems = [
    "New In",
    "Designers",
    "Clothing",
    "Shoes",
    "Bags",
    "Editorial",
    "SALE",
  ];
  const subMenuItems = [
    "For Women",
    "For Men",
    "For Baby",
    "Travel",
    "Accessories",
    "Fashion",
    "Shoes",
  ];

  const [searchPopup, setSearchPopup] = useState(false);

  return (
    <div className=" border-b text-white px-10 flex justify-center p-4 md:pt-6 items-center bg-[#2a4634] rounded-t-none fixed top-0 h-[4rem]  z-50 backdrop-blur-lg text-sm text-black font-extralight mx-auto w-[100%]">
      <div
        className={`${
          showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
        } p-8 bg-white flex w-full absolute text-black transition-all duration-300 top-full`}
      >
        <div className="flex flex-col w-full gap-10 px-10">
          <div className="flex  gap-20">
            <div className="flex flex-col gap-6 w-full">
              <p>WOMEN</p>
              <Link href={"/"}>Tops</Link>
              <Link href={"/"}>Iconic Shoes</Link>
              <Link href={"/"}>Phone Cases</Link>
              <Link href={"/"}>Swimwear</Link>
            </div>
            <div className="flex  flex-col gap-6 w-full">
              <p>MEN</p>
              <Link href={"/"}>All Bags</Link>
              <Link href={"/"}>Sneakers</Link>
              <Link href={"/"}>Make it yours</Link>
              <Link href={"/"}>Bagpacks</Link>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <p>Product History</p>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className=" p-4 bg-gradient-to-b from-[#e3e1e0] to-[#f6f5f3]">
                    <Image
                      src="/lv-1.avif"
                      alt="lv-1"
                      width={100}
                      height={100}
                      className="w-20 h-20"
                    />
                  </div>
                  <p>Twist PM</p>
                </div>
                <div className="flex items-center  gap-4">
                  <div className=" p-4 bg-gradient-to-b from-[#e3e1e0] to-[#f6f5f3]">
                    <Image
                      src="https://eu.louisvuitton.com/images/is/image/LP0083_PM2_Front%20view.png?wid=216&hei=216"
                      alt="lv-1"
                      width={100}
                      height={100}
                      className="w-20 h-20"
                    />
                  </div>
                </div>
                <p>Twist PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-l px-10 flex flex-col gap-4">
          <p>PRODUCTS</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className=" p-4 bg-gradient-to-b from-[#e3e1e0] to-[#f6f5f3]">
                <Image
                  src="/lv-1.avif"
                  alt="lv-1"
                  width={100}
                  height={100}
                  className="w-20 h-20"
                />
              </div>
              <p>Twist PM</p>
            </div>
            <div className="flex items-center gap-4">
              <div className=" p-4 bg-gradient-to-b from-[#e3e1e0] to-[#f6f5f3]">
                <Image
                  src="/lv-1.avif"
                  alt="lv-1"
                  width={100}
                  height={100}
                  className="w-20 h-20"
                />
              </div>
              <p>Twist PM</p>
            </div>
            <div className="flex items-center gap-4">
              <div className=" p-4 bg-gradient-to-b from-[#e3e1e0] to-[#f6f5f3]">
                <Image
                  src="/lv-1.avif"
                  alt="lv-1"
                  width={100}
                  height={100}
                  className="w-20 h-20"
                />
              </div>
              <p>Twist PM</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` transition-all duration-300 absolute top-0 w-full h-full text-black bg-white z-[10000] ${
          showSearch ? " translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="flex justify-center relative  items-center h-full">
          <div className="w-fit flex gap-6 items-center px-4 rounded-md bg-[#f6f5f3] justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              className=" translate-y-[1px] scale-125"
            >
              <circle cx="6.5" cy="6.5" r="6" stroke="black"></circle>
              <path d="M15 15L11 11" stroke="black"></path>
            </svg>
            <input
              type="text"
              className="bg-[#f6f5f3] w-[50vw] p-2 rounded-md outline-none text-ssm"
              placeholder="Search for Mother's day gifts"
            />
            <button onClick={() => setShowSearch(false)}>
              <CloseIcon className="text-black absolute top-1/2 -translate-y-1/2 right-6" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={` absolute top-0 transition-all duration-300 z-[49] flex w-screen left-0 h-screen ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-white h-full flex flex-col gap-7 w-[30%] text-black py-20 text-xl px-10">
          {menuItems.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setHiddenMenu(true);
              }}
              className=" flex justify-between group cursor-pointer"
            >
              <div className=" overflow-hidden">
                <Link href={"/"} className="text-xl">
                  {item}
                </Link>
                <div className="bg-black transition-all duration-300 w-full h-[1px] -translate-x-full group-hover:translate-x-0"></div>
              </div>
              <KeyboardArrowRightIcon className=" opacity-0 group-hover:opacity-[100] transition-all duration-300" />
            </div>
          ))}
        </div>
        <div
          className={`w-[70%] bg-black flex h-full ${
            showMenu ? " bg-opacity-80" : "bg-opacity-0"
          } transition-all duration-300 delay-300`}
        >
          <div
            className={`w-[40%] text-black flex flex-col gap-4 bg-white h-full border-l py-20 px-10  ${
              hiddenMenu ? "flex" : "hidden"
            }`}
          >
            {subMenuItems.map((item, i) => (
              <div
                key={i}
                className={`${
                  hiddenMenu
                    ? " translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                } transition-all duration-300 flex justify-between group cursor-pointer`}
              >
                <div className=" overflow-hidden">
                  <Link href={"/"} className="text-xs">
                    {item}
                  </Link>
                  <div className="bg-black transition-all duration-300 w-full h-[1px] -translate-x-full group-hover:translate-x-0"></div>
                </div>
                <KeyboardArrowRightIcon className=" opacity-0 group-hover:opacity-[100] transition-all duration-300" />
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              setShowMenu(false);
              setHiddenMenu(false);
            }}
            className="w-[60%] h-full"
          ></div>
        </div>
      </div>
      <div className="mx-auto bg-[#2a4634] flex items-center justify-between relative w-[100%]">
        <div
          className={`bg-white md:hidden transition-all duration-300 w-full absolute flex items-center justify-center ${
            showSearch ? "top-[60px]" : "top-[-100px]"
          } z-[-1] h-10`}
        >
          <form
            className={` border w-60 justify-between rounded-sm flex items-center py-1 px-2 gap-2`}
            onSubmit={sumbitHandler}
          >
            <input
              type="text"
              className=" bg-white outline-none w-52  placeholder:text-normal tracking-wide"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="search for product or category"
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
        <div className="flex  items-center gap-4">
          <div className="flex items-center">
            <button
              onClick={() => {
                setShowMenu((curr) => !curr);
              }}
              className={`flex z-[2000] flex-col bg-transparent px-2 transition-all duration-300 py-[13px] rounded-full ${
                showMenu ? "gap-0" : "gap-1"
              } `}
            >
              <div
                className={` w-4 h-[1px] rounded transition-all duration-300 ${
                  showMenu
                    ? "rotate-45 bg-black translate-y-[1px]"
                    : "rotate-0 bg-white"
                }`}
              ></div>
              <div
                className={` w-4 h-[1px] rounded transition-all duration-300 ${
                  showMenu
                    ? "-rotate-45 -translate-y-[px] bg-black"
                    : "rotate-0 bg-white"
                }`}
              ></div>
            </button>
            <div className=" overflow-hidden h-5 z-50">
              <p
                className={`${
                  showMenu ? " -translate-y-full" : ""
                } transition-all duration-300`}
              >
                Menu
              </p>
              <p
                className={`${
                  showMenu ? " -translate-y-full" : ""
                } transition-all duration-300 text-black`}
              >
                Close
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowSearch((curr) => !curr);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              className=" translate-y-[1px]"
            >
              <circle cx="6.5" cy="6.5" r="6" stroke="white"></circle>
              <path d="M15 15L11 11" stroke="white"></path>
            </svg>
          </button>
          <button
            className="md:hidden"
            onClick={() => {
              setShowSearch((curr) => !curr);
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <Link href={"/"} className="text-xl">
            SHREMZ
          </Link>
        </div>
        <div className=" flex gap-4 items-center">
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
                  <div className="flex items-center gap-2 text-normal user-icon relative">
                    <svg
                      className="icon icon-account z-50"
                      id="Group_3"
                      data-name="Group 3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                    >
                      <g
                        id="Rectangle_Copy_4"
                        data-name="Rectangle Copy 4"
                        transform="translate(0 9)"
                        fill="none"
                        stroke-miterlimit="10"
                      >
                        <path d="M0,2,7,0l7,2V6H0Z" stroke="none"></path>
                        <path
                          d="M 7 1.040011405944824 L 1 2.754297256469727 L 1 5 L 13 5 L 13 2.754297256469727 L 7 1.040011405944824 M 7 0 L 14 2 L 14 6 L 0 6 L 0 2 L 7 0 Z"
                          stroke="none"
                          fill="#fff"
                        ></path>
                      </g>
                      <g
                        id="Oval"
                        transform="translate(3)"
                        fill="none"
                        stroke="#fff"
                        stroke-miterlimit="10"
                        stroke-width="1"
                      >
                        <circle cx="4" cy="4" r="4" stroke="none"></circle>
                        <circle cx="4" cy="4" r="3.5" fill="none"></circle>
                      </g>
                    </svg>
                    <ul className=" absolute top-6 -right-4 bg-white shadow-lg flex flex-col text-sm user-links font-normal -translate-y-4 text-black z-[49]">
                      <li className=" capitalize italic w-40 bg-[#2a4634] text-white p-4 cursor-default h-20 flex pt-9 items-center justify-center">
                        Hi, {user?.name}
                      </li>
                      <Link href="/account">
                        <li className=" hover:bg-gray-200 w-40 p-4">
                          My Account
                        </li>
                      </Link>
                      <Link href="/testimonial" className="bg-white-200">
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
                        <li className=" hover:bg-gray-200 w-40 p-4">Logout</li>
                      </button>
                    </ul>
                  </div>
                </button>
                <Link href="/cart" className=" relative">
                  <div className=" hover:scale-125 transition-all duration-200">
                    <svg
                      class="icon icon-cart"
                      id="Group"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                    >
                      <g id="Group_18" data-name="Group 18">
                        <g
                          id="Rectangle_Copy_4"
                          data-name="Rectangle Copy 4"
                          transform="translate(0 4)"
                          fill="#2a4634"
                          stroke="#fff"
                          stroke-miterlimit="10"
                          stroke-width="1"
                        >
                          <rect width="14" height="11" stroke="none"></rect>
                          <rect
                            x="0.5"
                            y="0.5"
                            width="13"
                            height="10"
                            fill="none"
                          ></rect>
                        </g>
                        <g
                          id="Path"
                          transform="translate(4)"
                          fill="none"
                          stroke-miterlimit="10"
                        >
                          <path
                            d="M6,5V3A3,3,0,0,0,0,3V5Z"
                            stroke="none"
                          ></path>
                          <path
                            d="M 5 4 L 5 3 C 5 1.897199988365173 4.102799892425537 1 3 1 C 1.897199988365173 1 1 1.897199988365173 1 3 L 1 4 L 5 4 M 6 5 L -4.440892098500626e-16 5 L -4.440892098500626e-16 3 C -4.440892098500626e-16 1.343150019645691 1.343150019645691 0 3 0 C 4.65684986114502 0 6 1.343150019645691 6 3 L 6 5 Z"
                            stroke="none"
                            fill="#fff"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className=" absolute bg-black text-normal w-5 h-5 flex justify-center items-center -top-3 -right-3 rounded-full text-white">
                    {cartSize ? cartSize : 0}
                  </div>
                </Link>
                <Link href="/wishList" className=" relative">
                  <div className=" hover:scale-125 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 17"
                      fill="none"
                    >
                      <path
                        d="M9.26063 12.6233L9 12.4641L8.73937 12.6233L4.47522 15.2278L5.63458 10.3675L5.70544 10.0705L5.4735 9.87179L1.67875 6.62118L6.65943 6.22188L6.96385 6.19748L7.08113 5.9155L9 1.30198L10.9189 5.9155L11.0362 6.19748L11.3406 6.22188L16.3213 6.62118L12.5265 9.87179L12.2946 10.0705L12.3654 10.3675L13.5248 15.2278L9.26063 12.6233Z"
                        stroke="white"
                      ></path>
                    </svg>
                  </div>
                  <div className=" absolute bg-black text-normal w-5 h-5 flex justify-center items-center -top-3 -right-3 rounded-full text-white">
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
