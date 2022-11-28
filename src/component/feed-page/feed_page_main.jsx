import React from "react";
import dateFormat from "dateformat";
import { LikeHnadler } from "./like_feed_page";
import { Comment } from "../comment/comments";

import "./feed_page.css";

export const Feed_page_main = ({ post }) => {
	const { img, likes, caption, createdAt, _id } = post;
	const userPic = post.user.img;
	const name = post.user.name;
	const userId = post.user._id;

	const postedAt = dateFormat(new Date(createdAt), "dddd, mmmm dS, yyyy");
	return (
		<div className="postCointainer">
			<div className="wrapper">
				<div className="left-col">
					<div className="post">
						<div className="info">
							<div className="user">
								<div className="profile-pic">
									<img src={userPic} alt={`${name} profile pic`} />
								</div>
								<p className="username">{name}</p>
							</div>
							<img src="img/option.PNG" className="options" alt="" />
						</div>
						<img src={img} className="post-image" alt={`${name} posts`} />
						<div className="post-content">
							<div className="likes">
								<LikeHnadler likes={likes} postId={_id} userId={userId} />
							</div>
							<div className="comments"></div>
							<p className="description">
								<span>{name} </span> {caption}
							</p>
							<p className="post-time">{postedAt}</p>
						</div>
						<Comment id={_id} />
					</div>
				</div>
			</div>
		</div>
	);
};
