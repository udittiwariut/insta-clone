import { ReactComponent as InstaLogo } from "./../../logos/instagram-wordmark.svg";
import "./login_page.css";
import { Link } from "react-router-dom";
import { makeAuthRequest } from "../../servise/axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
	const submitHandler = async (e) => {
		e.preventDefault();

		const stringifyData = JSON.stringify(loginInfo);

		try {
			const data = await makeAuthRequest("login", stringifyData);
			console.log(data);
			dispatch({
				type: "GET_TOKEN",
				payload: data.token,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	const changeHandler = (e) => {
		const data = { ...loginInfo };
		data[e.target.id] = e.target.value;
		setLoginInfo(data);
	};

	return (
		<div id="wrapper">
			<div className="main-content">
				<div className="header">
					<InstaLogo />
				</div>
				<div className="l-part">
					<form onSubmit={submitHandler}>
						<input
							type="text"
							placeholder="Email"
							className="input-1"
							value={loginInfo.email}
							onChange={(e) => changeHandler(e)}
							id="email"
						/>
						<div className="overlap-text">
							<input
								type="password"
								placeholder="Password"
								className="input-2"
								value={loginInfo.password}
								onChange={(e) => changeHandler(e)}
								id="password"
							/>
						</div>
						<input type="submit" value="Log in" className="btn" />
					</form>
					<div className="s-part">
						Don't have an account?
						{
							<Link to={"/singin"}>
								<span>Sign up</span>
							</Link>
						}
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
