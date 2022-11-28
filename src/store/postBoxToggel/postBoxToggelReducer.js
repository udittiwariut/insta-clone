import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPostBoxOpenByNav: false,
	isPostBoxOpenByDropDown: false,
};

const postBoxToggelReducer = createSlice({
	name: "POST_BOX_TOGGEL",
	initialState,
	reducers: {
		isPostBoxOpenByNav: (state, action) =>
			void (state.isPostBoxOpenByNav = action.payload),
		isPostBoxOpenByDropDown: (state, action) =>
			void (state.isPostBoxOpenByDropDown = action.payload),
	},
	extraReducers: (builder) => {
		builder.addDefaultCase((state, action) => {
			return (state = { ...state });
		});
	},
});
export const { isPostBoxOpenByNav, isPostBoxOpenByDropDown } =
	postBoxToggelReducer.actions;
export default postBoxToggelReducer.reducer;
