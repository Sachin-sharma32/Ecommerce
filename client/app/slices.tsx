import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../utils/types";

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
        setTotal: (state) => {
            state.total =
                state.cart?.products.reduce((acc: number, item: ProductWithQuantity) => {
                    return acc + item.quantity * item.product.price
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
