import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    order: null,
    address: null,
};

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
    }
});

export const { setAddress } = orderSlice.actions;
export default orderSlice.reducer;
