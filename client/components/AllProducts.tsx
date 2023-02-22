/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Edit from "./Edit";
import { useDeleteProduct, useGetProducts } from "../hooks/useProduct";
import Spinner from "../utils/spinner";
import SuccessModel from "../utils/successModel";
import { useRemoveFromCart } from "../hooks/useCart";
import { Product, ProductWithQuantity, State, User } from "../utils/types";
import Error from "../utils/error";
import { setCart } from "../app/slices";
import MessageModel from "../utils/messageModel";
import East from "@mui/icons-material/East";
import West from "@mui/icons-material/West";

const AllProducts = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const productsPerPage = 5;
    const products = useSelector((state) => state.auth.products);
    const [currentPage, setCurrentPage] = useState(1);
    currentPage;
    const pages = [];
    if (products) {
        for (let i = 1; i < Math.ceil(products.length / productsPerPage); i++) {
            pages.push(i);
        }
    }
    pages;

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = products?.slice(
        firstProductIndex,
        lastProductIndex
    );
    lastProductIndex, firstProductIndex;

    const user = useSelector((state: State): User => state.auth.user);
    const cart = useSelector((state: State) => state.auth.cart);

    const [editing, setEditing] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const onDelete = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 1000);
    };

    const { mutate: deleteProduct } = useDeleteProduct(onDelete);

    const onSuccess = (data: any) => {
        dispatch(setCart(data.data.data.doc));
        deleteProduct(data.data.data.product.product);
    };

    const { mutate: removeFromCart, data } = useRemoveFromCart(
        cart?._id,
        onSuccess
    );

    const removeFromCartAndDelete = (productId: string) => {
        const deletedProduct = cart.products.filter(
            (item: ProductWithQuantity) => {
                return item.product?._id == productId;
            }
        );
        if (deletedProduct?.length === 1) {
            const quantity = deletedProduct[0].quantity;
            const productId = deletedProduct[0].product._id;
            removeFromCart({ quantity, productId });
        } else if (deletedProduct?.length !== 1) {
            deleteProduct(productId);
        }
    };

    if (products?.length === 0) {
        return <MessageModel>There are no products to show</MessageModel>;
    }

    return (
        <div className=" text-xs ">
            {show && <SuccessModel>product deleted successfully</SuccessModel>}
            {currentProducts ? (
                <div className=" relative">
                    {!selectedProduct && !editing && (
                        <table className=" w-full items-center text-center border-b 300">
                            <tr className=" hover:bg-gray-100">
                                <th className=" border-b 300">Name</th>
                                <th className=" border-b 300">Image</th>
                                <th className=" border-b 300">Category</th>
                                <th className=" border-b 300">Price</th>
                                <th className=" border-b 300">Actions</th>
                            </tr>
                            {currentProducts.map((product: Product) => (
                                <tr
                                    className=" mt-4 border-b 300 hover:bg-gray-100"
                                    key={product._id}
                                >
                                    <td className=" border-b 300">
                                        {product.title}
                                    </td>
                                    <td className=" flex justify-center">
                                        <div className=" bg-gray-100">
                                            {product.img && (
                                                <img
                                                    src={product.img[0]}
                                                    className=" w-16 "
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className=" border-b 300">
                                        {product.category}
                                    </td>
                                    <td className=" border-b 300">
                                        {product.price}
                                    </td>
                                    <td className=" border-b 300 text-blue-500">
                                        <button
                                            className=" mr-4  hover:scale-125 transition-all duration-200"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setEditing(true);
                                            }}
                                        >
                                            <EditIcon className=" text-gray-500" />
                                        </button>
                                        <button
                                            className=" hover:scale-125 transition-all duration-200"
                                            onClick={() =>
                                                removeFromCartAndDelete(
                                                    product._id
                                                )
                                            }
                                        >
                                            <DeleteIcon className=" text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    )}

                    {selectedProduct && editing && (
                        <Edit
                            product={selectedProduct}
                            setEditing={setEditing}
                            setSelectedProduct={setSelectedProduct}
                        />
                    )}
                </div>
            ) : (
                <Spinner />
            )}
            {products && (
                <div className=" flex justify-center mt-8 mb-8">
                    <div className="flex gap-2">
                        <button
                            className=" hover:-translate-x-1 duration-200 transition-all"
                            onClick={() =>
                                setCurrentPage((current) => {
                                    if (current === 1) {
                                        return pages.length;
                                    } else {
                                        return current - 1;
                                    }
                                })
                            }
                        >
                            <West />
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                className={` p-2  w-6 h-6 flex justify-center items-center ${
                                    currentPage === page
                                        ? " bg-black text-white"
                                        : "bg-gray-200"
                                }`}
                                onClick={() => {
                                    setCurrentPage(page);
                                }}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className=" hover:translate-x-1 duration-200 transition-all"
                            onClick={() =>
                                setCurrentPage((current) => {
                                    if (current === pages.length) {
                                        return 1;
                                    } else {
                                        return current + 1;
                                    }
                                })
                            }
                        >
                            <East />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
