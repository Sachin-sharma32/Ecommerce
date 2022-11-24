import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cart: null,
    user: null,
    products: null,
    total: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        addProducts: (state, action) => {
            state.products = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setTotal: (state, action) => {
            state.total =
                state.cart?.products.reduce((acc, item) => {
                    return acc + item.quantity * item.product.price;
                }, 0) + 50;
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const {
    setUser,
    addProducts,
    setCart,
    setTotal,
    setToken,
} = authSlice.actions;
export default authSlice.reducer;
