import { createSlice } from "@reduxjs/toolkit";

export interface filterState {
    title: string;
    genre: string;
    cinema: string[]; //айди фильмов
}

const initialState: Record<string, any> = {
    title: undefined,
    genre: undefined,
    cinema: undefined,
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        change: ((state, {payload} : { payload: {
            filter: keyof filterState,
            value: string | string[]
        }}) => {
            state[payload.filter] = payload.value;
        }),
        resetAll: () => initialState,
        reset: ((state, {payload} : { payload: {
            filter: keyof filterState
        }}) => {
            state[payload.filter] = undefined;
        })
    }
})

export const filterSliceReducer = filterSlice.reducer;
export const filterSliceActions = filterSlice.actions;
