import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppDispatch } from "@/store";
import { User, UserState } from "@/types/type";

const USER_STORAGE_KEY = "user_data";

const initialState: UserState = {
	user: null,
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserState(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		clearUserState(state) {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
});

export const { setUserState, clearUserState } = userSlice.actions;

// Async thunk to set user data and save to AsyncStorage
export const setUser = (user: User) => async (dispatch: AppDispatch) => {
	try {
		await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
		dispatch(setUserState(user));
	} catch (error) {
		console.error("Failed to save user to AsyncStorage", error);
	}
};

// Async thunk to clear user data from Redux and AsyncStorage
export const clearUser = () => async (dispatch: AppDispatch) => {
	try {
		await AsyncStorage.removeItem(USER_STORAGE_KEY);
		dispatch(clearUserState());
	} catch (error) {
		console.error("Failed to clear user from AsyncStorage", error);
	}
};

// Load user data from AsyncStorage on app startup
export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
	try {
		const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
		if (storedUser) {
			const user: User = JSON.parse(storedUser);
			dispatch(setUserState(user));
		}
	} catch (error) {
		console.error("Failed to load user from AsyncStorage", error);
	}
};

export const selectUser = (state: RootState): UserState => state.user;
export default userSlice.reducer;
