import { ReactComponent as InstaLogo } from "./../../logos/instagram-wordmark.svg";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { makeAuthRequest } from "../../servise/axios";
import "./sing_in.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingInPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [singinInfo, setSinginInfo] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
	});

	const chnageHandler = (e) => {
		let data = { ...singinInfo };
		data[e.target.id] = e.target.value;
		setSinginInfo(data);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const stringifyData = JSON.stringify(singinInfo);

		try {
			const data = await makeAuthRequest("user/singin", stringifyData);
			dispatch({
				type: "GET_TOKEN",
				payload: data.token,
			});
			navigate("/");
			console.log(data);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div className="main">
			<div className="page">
				<div className="header">
					{/* <h1 class="logo">Picturegram</h1> */}
					<InstaLogo />
					<br />
					<BsInstagram size={27} />
					<p>Sign up to see photos and videos from your friends.</p>
					<div>
						<hr />
						<p>OR</p>
						<hr />
					</div>
				</div>
				<div className="container">
					<form onSubmit={submitHandler}>
						<input
							onChange={(e) => chnageHandler(e)}
							value={singinInfo.email}
							type="text"
							placeholder="Mobile Number or Email"
							id="email"
						/>

						<input
							onChange={chnageHandler}
							value={singinInfo.name}
							type="text"
							placeholder="Username"
							id="name"
						/>
						<input
							onChange={chnageHandler}
							value={singinInfo.password}
							type="password"
							placeholder="Password"
							id="password"
						/>
						<input
							onChange={chnageHandler}
							value={singinInfo.confirmPassword}
							type="password"
							placeholder="Confirm Password"
							id="confirmPassword"
						/>
						<button type="submit">Sign up</button>
					</form>
				</div>
			</div>
			<div className="option">
				<p>
					Have an account?
					{
						<Link to={"/login"}>
							<span>Log In</span>
						</Link>
					}
				</p>
			</div>
		</div>
	);
};
export default SingInPage;
