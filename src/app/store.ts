import {configureStore} from "@reduxjs/toolkit";
import {orderingAppReducer} from "../store/orderingAppSlice";

export const store = configureStore({
  reducer: {
    orderingApp: orderingAppReducer,
  },
});

export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;