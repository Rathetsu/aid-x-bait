import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { LocationState, LocationPayload } from "@/types/type";

const initialState: LocationState = {
	userLatitude: null,
	userLongitude: null,
	userAddress: null,
};

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setUserLocation: (state, action: PayloadAction<LocationPayload>) => {
			const { latitude, longitude, address } = action.payload;
			state.userLatitude = latitude;
			state.userLongitude = longitude;
			state.userAddress = address;
		},
	},
});

export const { setUserLocation } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
