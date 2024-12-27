import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartState } from "@/types/type";

const initialState: CartState = {
	items: [
		{ id: 1, name: "Medical Product", price: 200, quantity: 1 },
		{ id: 2, name: "Medical Product", price: 200, quantity: 1 },
	],
	discountCode: "",
	discountAmount: 45,
	deliveryFee: 5,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		incrementQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item) {
				item.quantity++;
			}
		},
		decrementQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((i) => i.id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity--;
			}
		},
		removeItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		applyDiscountCode: (state, action: PayloadAction<string>) => {
			if (action.payload.trim()) {
				state.discountCode = action.payload;
			}
		},
	},
});

export const {
	incrementQuantity,
	decrementQuantity,
	removeItem,
	applyDiscountCode,
} = cartSlice.actions;

export default cartSlice.reducer;
