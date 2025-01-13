import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";

const initialState = {
	user: null,
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		clearUser(state) {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
