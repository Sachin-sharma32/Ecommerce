import React from "react";
import ProductListCard from "./ProductListCard";
import { ColorRing } from "react-loader-spinner";
import { useGetProducts } from "../hooks/useProduct";
import Error from "../utils/error";
import { Product } from "../utils/types";
import MessageModel from "../utils/messageModel";

interface AppProps {
  sort?: string;
  color?: string;
  size?: string;
  search?: string;
  limit?: boolean;
  featured?: boolean;
}

const ProductList = ({
  sort,
  color,
  size,
  search,
  limit,
  featured,
}: AppProps) => {
  console.log(search);
  const onSuccess = () => {};
  let { isLoading, isError, error, data: products } = useGetProducts(onSuccess);

  if (limit) {
    products = products?.slice(0, 8);
  }
  console.log(products);

  if (search) {
    search = search.toLowerCase();
    products = products?.filter((item: Product) => {
      return (
        item.category.includes(search) ||
        item.collectionName.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search) ||
        item.color.includes(search) ||
        item.desc.toLowerCase().includes(search) ||
        item.size.includes(search)
      );
    });
  }

  if (sort && products) {
    if (sort === "Newest") {
      products.sort(
        (a: Product, b: Product) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else if (sort === "Low to High") {
      products.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sort === "High to Low") {
      products.sort((a: Product, b: Product) => b.price - a.price);
    } else if (sort === "Oldest") {
      products.sort(
        (a: Product, b: Product) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
    }
  }

  if (color && size) {
    if (color === "all" && size !== "all") {
      products = products?.filter((item: Product) => {
        return item.size.includes(size);
      });
    } else if (size === "all" && color !== "all") {
      products = products?.filter((item: Product) => {
        return item.color.includes(color);
      });
    } else if (color === "all" && size === "all") {
      products = products;
    } else {
      products = products?.filter((item: Product) => {
        return item.color.includes(color) && item.size.includes(size);
      });
    }
  }

  if (featured) {
    products = products?.filter((product) => {
      return product.featured;
    });
  }

  return (
    <div className=" p-10 mt-4 justify-center relative">
      {products?.length === 0 && <MessageModel>No products found</MessageModel>}
      {isLoading ? (
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : isError ? (
        <Error error={error.response.data.message} />
      ) : products ? (
        <div className="grid__container gap-6">
          {products.map((product: Product) => (
            <ProductListCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <Error className="p-10">LogIn To See All Products</Error>
      )}
    </div>
  );
};

export default React.memo(ProductList);
