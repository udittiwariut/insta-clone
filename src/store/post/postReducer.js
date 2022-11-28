const postReducer = (state = { posts: {} }, action) => {
	const { type, payload } = action;
	switch (type) {
		case "GET_POST":
			return { ...state, posts: payload };
		default:
			return { ...state };
	}
};
export default postReducer;
