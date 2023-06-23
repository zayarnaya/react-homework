import { createSlice } from "@reduxjs/toolkit";

export interface CartSliceState {
    id: number;
    amount: number;
}

const initialState = {};

export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        plus: ((state, {payload}) => {
            const amount = state[payload] || 0;
            state[payload] = amount + 1;
        }),
        minus: ((state, {payload}) => {
            const amount = state[payload] || 0;
            if (!count) return;
            if (count === 1) {
                delete state[payload];
                return;
            }
            state[payload] = amount - 1;
        }),
        reset: () => initialState,
        
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions; // а вот что это?
