import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeGetRequest } from "../../servise/axios";
import { userPost } from "./../../store/user posts/userPostReducer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactComponent as InstaLogo } from "./../../logos/instagram-wordmark.svg";
import { AiFillHome, AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import { BiUserCircle } from "react-icons/bi";
import LoginPage from "../login/login.componet";
import { PostUploader } from "../post_uploader/post_uploader";
import { userSelector } from "../../store/user/userSelector";
import axios from "axios";
import {
	isPostBoxOpenByNav,
	isPostBoxOpenByDropDown,
} from "../../store/postBoxToggel/postBoxToggelReducer";
import { feedPost } from "../../store/feed_post/feedPost";
import { config } from "../../servise/axios";

import "./nav.scss";
const NavBar = () => {
	const dispatch = useDispatch();

	const token = localStorage.getItem("token");

	const isPostUploaderOpenForNav = useSelector(
		(state) => state.isPostBoxOpen.isPostBoxOpenByNav
	);
	const isPostUploaderOpenForDropdown = useSelector(
		(state) => state.isPostBoxOpen.isPostBoxOpenByDropDown
	);

	const navClickHnadler = () => {
		dispatch(isPostBoxOpenByNav(!isPostUploaderOpenForNav));
	};

	const data = async () => {
		try {
			const userData = await makeGetRequest("user");

			const userPostData = await makeGetRequest("post/userprofile");

			const data = await makeGetRequest("post");

			dispatch({
				type: "GET_USER",
				payload: userData,
			});

			dispatch(userPost(userPostData.userPost));

			dispatch({
				type: "GET_POST",
				payload: data,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		data();
	}, [dispatch]);

	if (token === null || token === undefined) {
		console.log(token);
		return <LoginPage />;
	} else {
		return (
			<>
				<div
					className={`nav_bar ${
						isPostUploaderOpenForNav || isPostUploaderOpenForDropdown
							? "nav-bar_blur"
							: null
					}`}
				>
					<div className="logo">
						<InstaLogo />
					</div>
					<div className="nav_items">
						<div className="nav_item">
							<Link to={"/"}>
								<AiFillHome className="nav_item" size={27} />
							</Link>
						</div>
						<div className="nav_item">
							<BsChat className="nav_item" size={27} />
						</div>

						<div className="nav_item" onClick={navClickHnadler}>
							<VscDiffAdded size={27} />
						</div>
						<div className="nav_item">
							<AiOutlineCompass className="nav_item" size={27} />
						</div>
						<div className="nav_item">
							<AiOutlineHeart className="nav_item" size={27} />
						</div>
						<div className="nav_item">
							<Link to={"/profile"}>
								<BiUserCircle className="nav_item" size={27} />
							</Link>
						</div>
					</div>
				</div>
				{isPostUploaderOpenForNav ? <PostUploader /> : null}

				<Outlet />
			</>
		);
	}
};
export default NavBar;
