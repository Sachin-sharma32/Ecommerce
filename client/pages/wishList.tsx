/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../app/slices";
import { useRouter } from "next/router";
import { ProductWithQuantity, State } from "../utils/types";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import Head from "next/head";
import SuccessModel from "../utils/successModel";
import MessageModel from "../utils/messageModel";
import { useAddToWishList, useRemoveFromWishList } from "../hooks/useWishList";
import ProductListCard from "../components/ProductListCard";
import CloseIcon from "@mui/icons-material/Close";
import { useAddToCart } from "../hooks/useCart";

const WishList = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state: State) => state.auth.wishList);
  const cart = useSelector((state: State) => state.auth.cart);
  const [success, setSuccess] = useState(false);
  const [removed, setRemoved] = useState(false);

  const onSuccess = (data: any): any => {
    dispatch(setWishList(data.data.data.doc));
    setRemoved(true);
    setTimeout(() => {
      setRemoved(false);
    }, 2000);
  };
  const { mutate: removeFromWishList } = useRemoveFromWishList(
    wishList?._id,
    onSuccess
  );

  const removeProductFromWishList = (productId: string) => {
    removeFromWishList({ productId });
  };

  const onAddSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const { mutate: addToCart } = useAddToCart(cart?._id, onAddSuccess);
  const addProductToCart = (productObject) => {
    addToCart(productObject);
  };

  return (
    <Smooth className=" min-h-screen mt-[6rem] px-10 text-sm mb-20">
      {success && <SuccessModel>added to wishList</SuccessModel>}
      {removed && <SuccessModel>removed from wishList</SuccessModel>}
      <Head>
        <title>Myntra - wishList</title>
        <link
          rel="icon"
          type="image/png"
          href="https://images.indianexpress.com/2021/01/myntra.png"
        />
        <meta
          name="description"
          content="The only online store you will need to fulfill all your needs"
        />
      </Head>
      <h1 className=" w-fit m-auto text-2xl font-semibold sticky uppercase">
        YOUR WishList
      </h1>
      <div className="flex justify-between mt-10">
        <Link
          href="/"
          className=" border border-black hover:border-white rounded-sm flex justify-center items-center px-2 hover:bg-black hover:text-white transition-all duration-200"
        >
          CONTINUE SHOPPING
        </Link>
      </div>

      <div className=" mt-20 lg:grid-cols-2 gap-10 justify-items-center">
        <ErrorBoundry>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full justify-items-center">
            {wishList?.products?.length === 0 && (
              <MessageModel>WishList is empty</MessageModel>
            )}
            {wishList &&
              wishList.products.map((item: ProductWithQuantity) => (
                <div
                  key={item._id}
                  className=" w-[200px] flex flex-col gap-3 relative"
                >
                  <ProductListCard product={item.product} />
                  <button
                    onClick={() => {
                      addProductToCart({
                        productId: item.product._id,
                        quantity: 1,
                        color: item.color,
                        size: item.size,
                      });
                      removeProductFromWishList(item.product._id);
                    }}
                    className=" uppercase w-full hover:bg-gray-500 hover:text-white transition-all duration-200 border"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeProductFromWishList(item.product._id)}
                  >
                    <CloseIcon className=" absolute top-0 right-0 cursor-pointer text-xl z-50 text-white" />
                  </button>
                </div>
              ))}
          </div>
        </ErrorBoundry>
      </div>
    </Smooth>
  );
};

export default WishList;

WishList.getInitialProps = async () => {
  return {
    title: "Wishlist",
    image: "/shremz.png",
    summery:
      "Elevate your wardrobe with our fashion-forward collections. Discover the perfect blend of trends and timeless classics. Unleash your inner fashionista and shop with confidence. Experience effortless style delivered right to your doorstep. Embrace the essence of chic and define your own fashion narrative with Shremz.",
    keywords: "shremz e-commerce bag women-bag purse shoes clothing store",
    type: "website",
    imageAlt: "Shremz Logo",
    parameter: "wishList",
  };
};
