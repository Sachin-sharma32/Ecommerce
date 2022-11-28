import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Address, User } from "../utils/types";

const initialState = {
    loading: false,
    error: "",
    order: null,
    address: null,
};

interface CreateOrder {
    user: User
    products: string[]
    amount: number,
    address: Address
}

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderObject: CreateOrder) => {
        const response = await axios.post(
            "http://localhost:8000/api/v1/orders",
            orderObject
        );
        return response.data.data.doc;
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setAddress: (state, action): void => {
            state.address = action.payload;
            localStorage.setItem(
                "address",
                JSON.stringify(state.address)
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            (state.order = []), (state.error = action.error.message);
        });
    },
});

export const { setAddress } = orderSlice.actions;
export default orderSlice.reducer;
