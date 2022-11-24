import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Edit from "./Edit";
import axios from "axios";
import { addProducts } from "../app/slices";

const AllOrders = () => {
    const token = useSelector((state) => state.auth.accessToken);

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

    const order = orders?.data.data.docs.map((order) => {
        return order;
    });

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
                        {order.map((products) =>
                            products.products.map((product) => (
                                <tr className=" mt-4">
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
                                    <td>{products?.user?._id}</td>
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
