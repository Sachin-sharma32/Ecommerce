import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices";
import orderReducer from './orderSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer
    },
});

export default store;
