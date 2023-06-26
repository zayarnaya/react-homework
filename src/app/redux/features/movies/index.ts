import { film } from "@/app/components/Films/Films";
import { createSlice } from "@reduxjs/toolkit";

export type movies = Record<string, film>;

const initialState: movies = {};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        add: ((state, {payload}) => {
            state[payload.id] = payload;
        }),
        addAll: ((state, {payload}) => {
            payload.forEach((item: film) => {
                state[item.id] = item;
            })
        })
    }

})

export const moviesReducer = moviesSlice.reducer;
export const moviesActions = moviesSlice.actions;
