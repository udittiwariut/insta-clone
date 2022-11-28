import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { PostUploader } from "./../post_uploader/post_uploader";
import { isPostBoxOpenByDropDown } from "../../store/postBoxToggel/postBoxToggelReducer";

import "./dropDown.css";

export const DropDown = () => {
	console.log(`log from th drop down`);
	const dispatch = useDispatch();

	const isPostBoxOpen = useSelector(
		(state) => state.isPostBoxOpen.isPostBoxOpenByDropDown
	);
	const clickHandler = () => {
		dispatch(isPostBoxOpenByDropDown(true));
	};
	if (isPostBoxOpen) {
		return <PostUploader profilePic={true} />;
	} else {
		return (
			<div className="dropDown">
				<ul>
					<li onClick={clickHandler}>
						<div className="dropDown_icon">
							<AiOutlineUser />
						</div>
						Update profile pic
					</li>
					<div className="dropDown_seprator"></div>
					<li>
						<div className="dropDown_icon">
							<FcAbout />
						</div>
						Update bio
					</li>
				</ul>
			</div>
		);
	}
};
