import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: "",
    order: null,
    address: null,
};

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderObject) => {
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
        setAddress: (state, action) => {
            state.address = action.payload;
            localStorage.setItem(
                "address",
                JSON.stringify(state.address)
            )(state.address);
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
