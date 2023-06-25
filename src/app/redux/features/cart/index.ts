import { createSlice } from "@reduxjs/toolkit";

export type cartItemsState = Record<string, {
    genre: string;
    posterUrl: string;
    title: string;
}>;

export type cartState = Record<string, number>

const initialState: cartState = {};

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
            if (!amount) return;
            if (amount === 1) {
                delete state[payload];
                return;
            }
            state[payload] = amount - 1;
        }),
        reset: ((state, {payload}) => {
            state[payload] = 0;
        }),
        
    }
})

export const totalSlice = createSlice({
    name: 'total',
    initialState: {total: 0},
    reducers: {
        plus: ((state) => {
            state.total++;
        }),
        minus: ((state) => {
            if (state.total === 0) {
                return;
            }
            state.total--;
        }),
        remove: ((state, {payload}) => {
            if (state.total < payload) {
                state.total = 0;
            } else {
                state.total -= payload;
            }
        })
    }
})

const itemsInit: cartItemsState = {};

export const cartItemsSlice = createSlice({
    initialState: itemsInit,
    name: "cartItems",
    reducers: {
        add: (state, {payload}) => {
            state[payload.id] = {
                title: payload.title,
                genre: payload.genre,
                posterUrl: payload.posterUrl,
            }
        },
        delete: (state, {payload}) => {
            delete state[payload.id];
        }
       
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions; // а вот что это?

export const totalReducer = totalSlice.reducer;
export const totalActions = totalSlice.actions; // а вот что это?

export const cartItemsReducer = cartItemsSlice.reducer;
export const cartItemsActions = cartItemsSlice.actions;
