/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Order } from "../utils/types";
import { useMemo } from "react";

const AllOrders = () => {
    const token = useSelector((state: any): string => state.auth.accessToken);

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8000/api/v1/orders",
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders(response);
        };
        fetch();
    }, [token]);

    const order = orders?.data.data.docs.map((order: Order): Order => {
        return order;
    });

    const allOrders = useMemo(() => order, [order])

    return (
        <div>
            {orders && (
                <div className=" relative mt-10">
                    <table className=" w-full items-center text-center">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>User</th>
                            <th>Price</th>
                        </tr>
                        {allOrders.map((order: Order) =>
                            order.products.map((product) => (
                                <tr key={product.product._id} className=" mt-4">
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
                                    <td>{order.user._id}</td>
                                    <td>{product.product.price}</td>
                                </tr>
                            ))
                        )}
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllOrders;
