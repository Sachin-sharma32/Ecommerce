/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetProduct } from "../../hooks/useProduct";
import Error from "../../utils/error";
import { useAddToCart, useRemoveFromCart } from "../../hooks/useCart";
import Spinner from "../../utils/spinner";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../utils/types";
import Smooth from "../../utils/smooth";
import Head from "next/head";
import SuccessModel from "../../utils/successModel";
import ErrorModel from "../../utils/errorModel";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Navigation,
    Autoplay,
    EffectCoverflow,
    Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
    useAddToWishList,
    useRemoveFromWishList,
} from "../../hooks/useWishList";
import { useGetRatings } from "../../hooks/useRating";
import Rating from "@mui/material/Rating";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { setWishList } from "../../app/slices";
import ProductListCard from "../../components/ProductListCard";
import EastIcon from "@mui/icons-material/East";

const Product = ({ productId }) => {
    const ratings = useSelector((state) => state.auth.ratings);
    const products = useSelector((state) => state.auth.products);
    const user = useSelector((state) => state.auth.user);
    const router = useRouter();

    console.log(router.query);
    const product = JSON.parse(router.query.object);

    const productRatings = ratings?.filter((rating) => {
        return rating.productId == productId;
    });
    const ratingLimit = productRatings?.slice(0, 2);
    // const product = products?.find((item) => {
    //     return item._id == productId;
    // });

    const [selectedImages, setSelectedImages] = useState(null);

    const ratingsSum = productRatings?.reduce((acc, rating) => {
        return acc + rating.rating;
    }, 0);
    let ratingsAvg = ratingsSum / productRatings?.length;
    ratingsAvg = String(ratingsAvg.toFixed(1));

    const imagesArray = productRatings?.map((rating) => {
        return rating.img;
    });

    let ratingImages = [];

    for (let i = 0; i < imagesArray?.length; i++) {
        ratingImages = ratingImages.concat(imagesArray[i]);
    }
    let limitImages = ratingImages.slice(0, 9);

    const [quantity, setQuantity] = useState(1);
    const [select, setSelect] = useState(0);

    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState("");
    err, msg;
    const [proudctExistInWishList, setProductExistInWishList] = useState(false);

    const cart = useSelector((state: State) => state.auth.cart);
    const wishList = useSelector((state: State) => state.auth.wishList);

    useEffect(() => {
        wishList?.products.find((product) => {
            product.product._id == productId && setProductExistInWishList(true);
        });
    }, [productId, wishList]);

    const filterProducts = products?.filter((item) => {
        return (
            item.collectionName === product?.collectionName &&
            item.title !== product.title
        );
    });

    const [success, setSuccess] = useState(false);
    const onSuccess = () => {
        setMsg("added to cart");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };
    const onWishListSuccess = () => {
        setMsg("added to wishList");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };
    const onAddCartError = (addCartError) => {
        setMsg(addCartError.response.data.message);
        setErr(true);
        setTimeout(() => {
            setErr(false);
        }, 2000);
    };
    const onAddWishListError = (addWishListError) => {
        setMsg(addWishListError.response.data.message);
        setErr(true);
        setTimeout(() => {
            setErr(false);
        }, 2000);
    };

    const dispatch = useDispatch();
    const onWishListRemoveSuccess = (data) => {
        dispatch(setWishList(data.data.data.doc));
    };

    const { mutate: addToCart, error: addCartError } = useAddToCart(
        cart?._id,
        onSuccess,
        onAddCartError
    );
    const { mutate: addToWishList, error: addWishListError } = useAddToWishList(
        wishList?._id,
        onWishListSuccess,
        onAddWishListError
    );
    const {
        mutate: removeFromWishList,
        error: removeWishListError,
        data,
    } = useRemoveFromWishList(wishList?._id, onWishListRemoveSuccess);
    const addProductToCart = () => {
        if (user) {
            if (!color && !size) {
                setMsg("color and size are required");
                setErr(true);
            } else if (!size) {
                setMsg("size is required");
                setErr(true);
            } else if (!color) {
                setMsg("color is required");
                setErr(true);
            } else {
                addToCart({ productId, quantity, color, size });
            }
            setTimeout(() => {
                setErr(false);
            }, 2000);
        } else {
            router.push("/signIn");
        }
    };
    const addProductToWishList = () => {
        if (user) {
            if (proudctExistInWishList) {
                setProductExistInWishList(false);
                removeFromWishList({ productId });
            } else {
                if (!color) {
                    setMsg("color is required");
                    ("hi");
                    setErr(true);
                } else if (!size) {
                    setMsg("size is required");
                    setErr(true);
                } else {
                    addToWishList({ productId, color, size });
                }
            }
        } else {
            router.push("/signIn");
        }
    };

    const bgClass = {
        gray: " bg-gray-500",
        red: " bg-red-500",
        orange: "bg-orange-500",
        yellow: " bg-yellow-500",
        green: " bg-green-500",
        teal: " bg-teal-500",
        blue: " bg-blue-500",
        indigo: " bg-indigo-500",
        purple: " bg-purple-500",
        pink: " bg-pink-500 ",
        white: "bg-white",
        black: "bg-black",
    };

    return (
        <Smooth className="min-h-screen flex justify-center items-center text-sm mt-[4rem] p-2">
            {success && <SuccessModel>{msg}</SuccessModel>}
            {err && <ErrorModel>{msg}</ErrorModel>}
            <Head>
                <title>Myntra - {product?.title}</title>
                <link rel="icon" type="image/png" href={product?.img} />
                <meta name="description" content={product?.desc} />
            </Head>
            {product && (
                <div
                    className={`flex justify-center ${
                        selectedImages ? " blur-sm pointer-events-none" : ""
                    }`}
                >
                    <div className=" p-10 grid-area-container gap-10 w-[100%] h-fit">
                        <div className="flex gap-1 h-[50vh] sm:h-[100vh]  w-[100%] images justify-center">
                            <div className=" h-[100%] flex bg-white w-[20%] sm:w-[20%]">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={10}
                                    grabCursor={true}
                                    loop={true}
                                    direction={"vertical"}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    modules={[Keyboard, Navigation]}
                                    className="mySwiper"
                                >
                                    {product.img.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={item}
                                                alt=""
                                                className="w-[100%] h-[100%] cursor-pointer rounded-lg"
                                                onClick={() => setSelect(index)}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="flex items-center justify-center w-[70%]">
                                <img
                                    src={product.img[select]}
                                    className=" w-[100%] h-[100%] rounded-lg"
                                    alt="img"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-10 details">
                            <div className="flex flex-col gap-4">
                                <h1 className=" text-2xl font-semibold capitalize">
                                    {product.title}
                                </h1>
                                <p>{product.desc}</p>
                                <h2 className="text-xl font-bold">
                                    $ {product.price}
                                </h2>
                                <div className="flex gap-10 items-center">
                                    <div className="flex gap-4 items-center">
                                        <h3 className=" text-l">Size</h3>
                                        <select
                                            className=" bg-white border p-1 text-center outline-none"
                                            onChange={(e) =>
                                                setSize(e.target.value)
                                            }
                                        >
                                            <option value="" disabled selected>
                                                size
                                            </option>
                                            {product.size.map(
                                                (item: string) => (
                                                    <option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <h3 className=" text-l">Color</h3>
                                        <select
                                            id=""
                                            className=" bg-white border p-1 text-center outline-non"
                                            onChange={(e) =>
                                                setColor(e.target.value)
                                            }
                                        >
                                            <option value="" disabled selected>
                                                color
                                            </option>
                                            {product.color.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div
                                        onClick={() => {
                                            setQuantity((current) => {
                                                if (current > 1) {
                                                    return current - 1;
                                                } else {
                                                    return 1;
                                                }
                                            });
                                        }}
                                    >
                                        <RemoveIcon className=" cursor-pointer" />
                                    </div>
                                    <p className=" border px-2 rounded-lg">
                                        {quantity}
                                    </p>
                                    <div
                                        onClick={() => {
                                            setQuantity(
                                                (current) => current + 1
                                            );
                                        }}
                                    >
                                        <AddIcon className=" cursor-pointer" />
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <button
                                        onClick={addProductToCart}
                                        className=" text-white hover:bg-blue hover:text-black hover:bg-white border px-4 py-2 transition-all duration-200 w-fit bg-black rounded-md"
                                    >
                                        Add To Cart
                                    </button>
                                    <Link
                                        href={{
                                            pathname: user
                                                ? `/rating/${product._id}`
                                                : "/signIn",
                                            query: user && {
                                                object: JSON.stringify(product),
                                            },
                                        }}
                                        className=" text-black hover:text-white hover:bg-black bg-white border px-4 py-2 transition-all duration-200 w-fit rounded-md"
                                    >
                                        RATE
                                    </Link>
                                    <button
                                        onClick={addProductToWishList}
                                        className=" cursor-pointer"
                                    >
                                        {proudctExistInWishList ? (
                                            <FavoriteOutlinedIcon color="primary" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {productRatings?.length > 0 ? (
                                <div className="flex flex-col gap-20">
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <p className=" text-lg flex items-center gap-2">
                                                Customer Reviews{" "}
                                                <span className=" text-xs">
                                                    ({productRatings?.length}{" "}
                                                    ratings)
                                                </span>
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={ratingsAvg}
                                                    readOnly={true}
                                                    precision={0.5}
                                                />
                                                <p>( {ratingsAvg} / 5 ) </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            {ratingLimit?.map((rating) => (
                                                <div
                                                    key={rating._id}
                                                    className=" text-xs flex flex-col gap-1 border-b"
                                                >
                                                    <Rating
                                                        name="simple-controlled"
                                                        className=" text-black"
                                                        value={rating.rating}
                                                        size={"small"}
                                                        readOnly={true}
                                                        precision={0.5}
                                                    />
                                                    <div>{rating.message}</div>
                                                    <div className="flex gap-2">
                                                        {rating.img.map(
                                                            (item, index) => (
                                                                <button
                                                                    key={index}
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        setSelectedImages(
                                                                            rating.img
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            item
                                                                        }
                                                                        className="w-20 h-20 rounded-lg"
                                                                        alt=""
                                                                    />
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {rating.userId.name}
                                                        </p>
                                                        <p>
                                                            {moment(
                                                                rating.updatedAt
                                                            ).format("LLL")}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            <Link
                                                href={`/reviews/${productId}`}
                                                className="gap-1 hover:gap-4 transition-all duration-200 flex items-center"
                                            >
                                                See All Reviews <EastIcon />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <p className=" text-lg">
                                                Customer Images (
                                                {ratingImages.length})
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-5 gap-2">
                                            {limitImages?.map((img, index) => (
                                                <button
                                                    key={index}
                                                    className="cursor-pointer w-fit"
                                                    onClick={() =>
                                                        setSelectedImages(
                                                            ratingImages
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={img}
                                                        className="w-20 h-20 rounded-lg"
                                                        alt=""
                                                    />
                                                </button>
                                            ))}
                                            <div
                                                className=" h-20 w-20 bg-gray-200 rounded-lg text-[10px] flex justify-center items-center cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-200"
                                                onClick={() =>
                                                    setSelectedImages(
                                                        ratingImages
                                                    )
                                                }
                                            >
                                                <p className=" w-fit">
                                                    See All Images
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className=" w-fit p-2 bg-gray-200 text-gray-500 rounded-lg">
                                    No Reviews Yet
                                </div>
                            )}
                        </div>
                        <div className="relatedProducts h-[100%] w-full flex flex-col gap-4">
                            <p className=" text-lg w-fit mx-auto">
                                Related Products
                            </p>
                            <div className=" w-[90vw] sm:w-[50vw] h-fit">
                                <Swiper
                                    slidesPerView={3}
                                    navigation={true}
                                    spaceBetween={10}
                                    grabCursor={true}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    modules={[Navigation, Pagination, Keyboard]}
                                    className="mySwiper"
                                >
                                    {filterProducts?.map((product) => (
                                        <SwiperSlide
                                            key={product._id}
                                            className="mb-10"
                                        >
                                            <ProductListCard
                                                product={product}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedImages && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 h-[80vh] w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] backdrop-opacity-25 flex justify-center">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        grabCursor={true}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        keyboard={{
                            enabled: true,
                        }}
                        modules={[Pagination, Navigation, Keyboard]}
                        className="mySwiper"
                    >
                        {selectedImages.map((img, index) => (
                            <SwiperSlide
                                className=" w-[100%] h-[100%]"
                                key={index}
                            >
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    className=" h-[100%] w-[100%]"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        className="absolute top-0 right-0 text-gray-500 z-50"
                        onClick={() => setSelectedImages(null)}
                    >
                        <CloseIcon className=" text-2xl cursor-pointer" />
                    </div>
                </div>
            )}
        </Smooth>
    );
};

export default Product;

export async function getServerSideProps(context) {
    return {
        props: { productId: context.params.product[0] },
    };
}
