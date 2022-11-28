const userReducer = (state = { user: {} }, action) => {
	const { type, payload } = action;

	switch (type) {
		case "GET_USER":
			return { ...state, user: payload.user };

		case "GET_TOKEN":
			localStorage.setItem("token", payload);
			return state;

		default:
			return state;
	}
};
export default userReducer;
