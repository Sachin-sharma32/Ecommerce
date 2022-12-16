/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotal } from "../app/slices";
import { createOrder } from "../app/orderSlice";
import { ProductWithDetails, ProductWithQuantity, State } from "../utils/types";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import Head from "next/head";
import axios from "axios";
import { create } from "@mui/material/styles/createTransitions";
import { useCreateOrder } from "../hooks/useOrder";
import SuccessModel from "../utils/successModel";
import { useRouter } from "next/router";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';


const Success = () => {

    return (
        <div className=" min-h-screen flex items-center justify-center text-xs text-center">
            <div>
                <h1 className="font-semibold text-lg">Order Placed SuccessFully</h1>
                <p>Your order will be safely delivered to your doorsteps.</p>
                <div className="flex justify-evenly">
                    <Link href={`/`} className="flex items-center gap-2 hover:gap-4 transition-all duration-200">
                        <WestIcon />
                        <p>Home</p>
                    </Link>
                    <Link href={`/myOrders`} className="flex items-center gap-2 hover:gap-4 transition-all duration-200">
                        <p>My Orders</p>
                        <EastIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
