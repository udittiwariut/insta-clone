import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/userSelector";
import { userPostSelector } from "../../store/user posts/userPostSelector";
import { DropDown } from "../dropDown/dropDown";
import { ProfilePagePost } from "../user_profile_post/user_profile_post";
import "./profile.css";
export const Profile = () => {
	const user = useSelector(userSelector);

	const userPost = useSelector(userPostSelector);

	const [dropDown, setDropDown] = useState(false);

	const [post, setPost] = useState([]);

	const [userinfo, setUserInfo] = useState({
		name: "",
		img: "",
		bio: "",
		followers: "",
		following: "",
	});

	useEffect(() => {
		const userDataSelector = () => {
			if (user.user !== undefined) {
				const { name, img, bio, followers, following } = user?.user;
				const data = {
					...userinfo,
					name,
					img,
					bio,
					followers,
					following,
				};
				setUserInfo(data);
			}
			console.log();
		};
		userDataSelector();
	}, [userPost, user]);

	useEffect(() => {
		const postDataSelector = () => {
			if (userPost !== undefined) {
				setPost(userPost);
			}
		};
		postDataSelector();
	}, [userPost]);

	return (
		<div className="profile_page">
			<div className="user_info">
				<div className="user_info_photo">
					<img src={userinfo.img} alt={"Profile PIC"} />
				</div>
				<div className="user_info_data">
					<div className="user_info_header">
						<span className="user_info_header_name">{userinfo.name}</span>
						<div className="user_info_header_btn_div">
							<button
								className="user_info_header_btn"
								onClick={() => {
									setDropDown(!dropDown);
								}}
							>
								Edit profile
							</button>
						</div>
						{dropDown ? <DropDown /> : null}
					</div>
					<div className="user_info_main">
						<span className="user_info_main_post">{`${post.length} Posts`}</span>
						<span className="user_info_main_follower">{`${
							userinfo.followers.length - 1
						} Follower`}</span>
						<span className="user_info_main_following">{`${userinfo.following.length} Following`}</span>
					</div>
					<div className="user_info_bio">{userinfo.bio}</div>
				</div>
			</div>
			<ProfilePagePost posts={post} />
		</div>
	);
};
