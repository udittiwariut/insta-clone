import { useEffect, useState } from "react";
import { GrGrid } from "react-icons/gr";
import Loader from "../../logos/loader/loader";
import { AiOutlineHeart } from "react-icons/ai";
import "./user_profile_post.css";
export const ProfilePagePost = (post) => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const postDataSelector = () => {
			if (post.posts !== undefined || post.posts.length > 0) {
				setPosts(post.posts);
			}
		};
		postDataSelector();
	}, [post]);

	return (
		<div className="ProfilePagePost">
			<header className="ProfilePagePost_header">
				<span className="ProfilePagePost_header_icon">
					<GrGrid />
				</span>
				<span>Post</span>
			</header>
			<div className="ProfilePagePost_posts">
				{posts.length > 0 ? (
					posts.map((post) => {
						return (
							<div className="ProfilePagePost_post" key={post._id}>
								<img src={post.img} alt="post" />
								<div className="hover_Like">
									<span>{post.likes.length}</span>{" "}
									<span className="hover_Like_icon">{<AiOutlineHeart />}</span>
								</div>
							</div>
						);
					})
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};
