/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetMe } from "../hooks/useAuth";
import { ProductWithDetails, State } from "../utils/types";

const MyOrders = () => {
    const token = useSelector((state: State) => state.auth.accessToken);
    const { data: user } = useGetMe();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (token) {
            const fetch = async () => {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/orders/get/${user._id}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                setOrder(response);
            };
            fetch();
        }
    }, [token, user]);


    return (
        <div>
            {order && (
                <div className=" relative mt-10">
                    <table className=" w-full items-center text-center">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                        {order.data.data.doc.products.map((product: ProductWithDetails) => (
                            <tr className=" mt-4" key={product.product._id}>
                                <td key={product.product._id}>
                                    {product.product.title}
                                </td>
                                <td className=" flex justify-center">
                                    {product.product.img && (
                                        <img
                                            src={product.product.img}
                                            width={100}
                                            height={50}
                                        />
                                    )}
                                </td>
                                <td>{product.product.category}</td>
                                <td>{product.product.price}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;