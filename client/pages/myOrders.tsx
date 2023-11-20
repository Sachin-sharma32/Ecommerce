import React from "react";
import Smooth from "../utils/smooth";
import MyOrders from "../components/MyOrders";
import Link from "next/link";
import WestIcon from "@mui/icons-material/West";

const Orders = () => {
  return (
    <Smooth className=" min-h-screen mt-[6rem] flex justify-center gap-14 text-normal">
      <Link
        href="/"
        className=" flex h-fit items-center gap-1 hover:gap-4 transition-all duration-200"
      >
        <WestIcon />
        <p>Back to Home</p>
      </Link>
      <MyOrders />
    </Smooth>
  );
};

export default Orders;

Orders.getInitialProps = async () => {
  return {
    title: "Orders",
    image: "/shremz.png",
    summery:
      "Elevate your wardrobe with our fashion-forward collections. Discover the perfect blend of trends and timeless classics. Unleash your inner fashionista and shop with confidence. Experience effortless style delivered right to your doorstep. Embrace the essence of chic and define your own fashion narrative with Shremz.",
    keywords: "shremz e-commerce bag women-bag purse shoes clothing store",
    type: "website",
    imageAlt: "Shremz",
    parameter: "orders",
  };
};
