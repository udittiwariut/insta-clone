import { createSlice } from "@reduxjs/toolkit";

const intaitalState = { userPost: [] };

const userPostSlice = createSlice({
	name: "user",
	intaitalState,
	reducers: {
		userPost: (state, action) => void (state.userPost = action.payload),
	},
	extraReducers: (builder) => {
		builder.addDefaultCase((state, action) => {
			return (state = { ...state });
		});
	},
});
export const { userPost } = userPostSlice.actions;
export default userPostSlice.reducer;
