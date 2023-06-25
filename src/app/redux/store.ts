import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, totalReducer } from "./features/cart";
import { movieApi } from "./services/services";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        cart: cartReducer,
        total: totalReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware]),
    devTools: process.env.NODE_ENV !== "production",
    
})
