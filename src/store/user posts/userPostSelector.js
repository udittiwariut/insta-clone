import { createSelector } from "@reduxjs/toolkit";

const userPost = (state) => state.userPosts;

export const userPostSelector = createSelector(
	userPost,
	(posts) => posts.userPost
);
