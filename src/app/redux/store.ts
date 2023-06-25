import { configureStore } from "@reduxjs/toolkit";
import { cartItemsReducer, cartReducer, totalReducer } from "./features/cart";
import { movieApi } from "./services/services";
import { moviesReducer } from "./features/movies";
import { filterSlice, filterSliceReducer } from "./features/filters";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        cart: cartReducer,
        total: totalReducer,
        cartItems: cartItemsReducer,
        movies: moviesReducer,
        filters: filterSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware]),
    devTools: process.env.NODE_ENV !== "production",
    
})
