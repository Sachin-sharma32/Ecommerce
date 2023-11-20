import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";
import React, { useState } from "react";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import CategoryBar from "../components/CategoryBar";
import Collections from "../components/Collections";
import Testimonials from "../components/Testimonials";
import Practice from "../components/Practice";
import Header1 from "../components/Header1";
import TopCategories from "../components/TopCategories";

export default function Home() {
  return (
    <Smooth className="min-h-screen home">
      <ErrorBoundry>
        <Header1 />
      </ErrorBoundry>
      <ErrorBoundry>
        <Collections />
      </ErrorBoundry>
      <ErrorBoundry>
        <TopCategories />
      </ErrorBoundry>
      <ErrorBoundry>{/* <Testimonials /> */}</ErrorBoundry>
      <Collections />
      <ErrorBoundry>
        <Newsletter />
      </ErrorBoundry>
    </Smooth>
  );
}

Home.getInitialProps = async () => {
  return {
    title: "",
    image: "/shremz.png",
    summery:
      "Elevate your wardrobe with our fashion-forward collections. Discover the perfect blend of trends and timeless classics. Unleash your inner fashionista and shop with confidence. Experience effortless style delivered right to your doorstep. Embrace the essence of chic and define your own fashion narrative with Shremz.",
    keywords: "shremz e-commerce bag women-bag purse shoes clothing store",
    type: "website",
    imageAlt: "Shremz",
    parameter: "",
  };
};
