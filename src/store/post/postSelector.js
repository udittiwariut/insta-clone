import { createSelector } from "@reduxjs/toolkit";

export const postSelector = createSelector(
	(state) => state.posts.posts,
	(posts) => posts.data
);
