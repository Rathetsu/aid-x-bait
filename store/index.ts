import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import locationReducer from "./slices/locationSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		location: locationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
