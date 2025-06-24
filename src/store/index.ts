import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.slice";
import userReducer from "./slices/user/user.slice";
import productsReducer from "./slices/products/products.slice";
import stocksReducer from "./slices/stocks/stocks.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productsReducer,
    stocks: stocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
