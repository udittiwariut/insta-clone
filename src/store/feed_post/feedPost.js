import { createSlice } from "@reduxjs/toolkit";

const initialState = { feedPost: [] };

const feedPostSlice = createSlice({
	name: "feedPage",
	initialState,
	reducers: {
		feedPost: (state, action) =>
			void (state.feedPost = [...state.feedPost, ...action.payload]),
	},
	extraReducers: (builder) => {
		builder.addDefaultCase((state, action) => {
			return (state = { ...state });
		});
	},
});
export const { feedPost } = feedPostSlice.actions;
export default feedPostSlice.reducer;
