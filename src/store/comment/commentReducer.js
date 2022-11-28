import { createSlice } from "@reduxjs/toolkit";

let intaitalState = { comments: {} };

const commentSlice = createSlice({
	name: "comment",
	intaitalState,
	reducers: {
		comments: (state, action) => void (state.comments = action.payload),
	},
	extraReducers: (builder) => {
		builder.addDefaultCase((state, action) => {
			return (state = { ...state });
		});
	},
});
export const { comments } = commentSlice.actions;
export default commentSlice.reducer;
