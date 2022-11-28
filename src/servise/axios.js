import axios from "axios";

const jwt = localStorage.getItem("token");
export const config = {
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${jwt}`,
	},
};
export const configFalseCredentials = {
	withCredentials: false,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${jwt}`,
	},
};
// Auth request

export const makeAuthRequest = async (url, data) => {
	try {
		const userData = await axios.post(
			`http://localhost:5000/api/v1/user/${url}`,
			data,
			config
		);
		return userData.data;
	} catch (error) {
		console.log(error.message);
	}
};

export const makeGetRequest = async (url) => {
	try {
		const res = await axios.get(`http://localhost:5000/api/v1/${url}`, config);
		return res.data;
	} catch (error) {
		console.log(error.message);
	}
};

export const makePostRequest = async (url, data) => {
	try {
		const res = await axios.post(
			`http://localhost:5000/api/v1/${url}`,
			data,
			config
		);
		return res.data;
	} catch (error) {
		console.log(error.message);
	}
};

export const makePatchRequest = async (url, data) => {
	try {
		const res = await axios.patch(
			`http://localhost:5000/api/v1/${url}`,
			data,
			config
		);
		return res.data;
	} catch (error) {
		console.log(error.message);
	}
};
export const makePutRequest = async (url, data) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/v1/${url}`,
			data,
			config
		);
		return res.data.likes;
	} catch (error) {
		console.log(error.message);
	}
};
