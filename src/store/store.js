import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import postReducer from "./post/postReducer";
import userReducer from "./user/userReducer";
import userPost from "./user posts/userPostReducer";
import postBoxToggelReducer from "./postBoxToggel/postBoxToggelReducer";
import feedPost from "./feed_post/feedPost";
import commentReducer from "./comment/commentReducer";

export default configureStore({
	reducer: {
		feedPosts: feedPost,
		posts: postReducer,
		user: userReducer,
		userPosts: userPost,
		isPostBoxOpen: postBoxToggelReducer,
		comments: commentReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger).concat(thunk),
});
