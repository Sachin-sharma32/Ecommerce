/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetMe } from "../hooks/useAuth";
import { Order, ProductWithDetails, State } from "../utils/types";
import OrdersTable from "./OrdersTable";

const MyOrders = () => {
    const orders = useSelector((state) => state.auth.orders)(orders);
    const myOrders = orders;

    return (
        <div className=" min-w-[500px]">
            <OrdersTable orders={orders} />
        </div>
    );
};

export default MyOrders;
