import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../utils/types";

const initialState = {
    cart: null,
    user: null,
    products: null,
    total: null,
    accessToken: null,
    categories: null,
    collections: null,
    selectedCategory: null,
    wishList: null,
    ratings: null,
    orders: null
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
                    return acc + (item.quantity * (item.product.discountPrice ? item.product.discountPrice : item.product.price))
                }, 0);
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setCollections: (state, action) => {
            state.collections = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setWishList: (state, action) => {
            state.wishList = action.payload
        },
        setRatings: (state, action) => {
            state.ratings = action.payload
        },
        setOrders: (state, action) => {
            state.orders = action.payload
            console.log(state.orders)
        }
    },
});

console.log("hello world")

export const {
    setUser,
    addProducts,
    setCart,
    setTotal,
    setToken,
    setCategories,
    setCollections,
    setSelectedCategory,
    setWishList,
    setRatings,
    setOrders
} = authSlice.actions;
export default authSlice.reducer;
