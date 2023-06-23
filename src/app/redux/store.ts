import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cart";
import { movieApi } from "./services/services";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
    
})
