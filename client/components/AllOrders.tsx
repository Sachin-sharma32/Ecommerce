/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { AuthState, Order } from "../utils/types";
import { useMemo } from "react";
import OrdersTable from "./OrdersTable";
import EastIcon from "@mui/icons-material/East";

const AllOrders = () => {
  const token = useSelector((state: any): string => state.auth.accessToken);
  const [current, setCurrent] = useState(0);
  const allTheOrders = useSelector((state: any) => state.auth.orders);
  const [status, setStatus] = useState("");
  console.log(allTheOrders);

  return (
    <div className="flex gap-4 text-normal">
      <div className="lg:flex flex-col gap-2 hidden">
        <button
          className="flex gap-2 cursor-pointer hover:gap-4 transition-all duration-200 items-center  w-40"
          onClick={() => setStatus("order placed")}
        >
          Order Placed
          <EastIcon />
        </button>
        <button
          className="flex gap-2 cursor-pointer hover:gap-4 transition-all duration-200 items-center  w-40"
          onClick={() => setStatus("out for delivery")}
        >
          Out For Delivery
          <EastIcon />
        </button>
        <button
          className="flex gap-2 cursor-pointer hover:gap-4 transition-all duration-200 items-center  w-40"
          onClick={() => setStatus("delivered")}
        >
          Delivered
          <EastIcon />
        </button>
        <button
          className="flex gap-2 cursor-pointer hover:gap-4 transition-all duration-200 items-center  w-40"
          onClick={() => setStatus("cancled")}
        >
          Cancled
          <EastIcon />
        </button>
      </div>
      <div className="absolute top-[5rem] left-1/2 -translate-x-1/2 lg:hidden w-[70vw]">
        <div className="flex gap-4 justify-center">
          <button
            className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${
              current === 0 ? "border-orange-500" : ""
            }`}
            onClick={() => {
              setStatus("order placed");
              setCurrent(0);
            }}
          >
            Order Placed
          </button>
          <button
            className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${
              current === 1 ? "border-orange-500" : ""
            }`}
            onClick={() => {
              setStatus("out for delivery");
              setCurrent(1);
            }}
          >
            Out For Delivery
          </button>
          <button
            className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${
              current === 2 ? "border-orange-500" : ""
            }`}
            onClick={() => {
              setStatus("delivered");
              setCurrent(2);
            }}
          >
            Delivered
          </button>
          <button
            className={`gap-1 hover:gap-4 transition-all duration-200 flex items-center border-b border-white ${
              current === 3 ? "border-orange-500" : ""
            }`}
            onClick={() => {
              setStatus("cancled");
              setCurrent(3);
            }}
          >
            Canceled
          </button>
        </div>
      </div>
      <div className=" min-w-[500px]">
        <OrdersTable orders={allTheOrders} admin={true} status={status} />
      </div>
    </div>
  );
};

export default AllOrders;
