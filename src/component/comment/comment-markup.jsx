import { useState } from "react";
import axios from "axios";
import { configFalseCredentials } from "./../../servise/axios";
import dateFormat from "dateformat";

import "./comment-markup.css";

export const CommentMarkup = ({
	comment,
	clickHandler,
	postId,
	sortedComment,
	rootComment,
}) => {
	const { name, img } = comment.user;
	const [commentText, setCommentText] = useState("");
	const chnageHandler = async (e) => {
		setCommentText(e.target.value);
	};

	let replyData = {
		postId: postId,
		commentText: commentText,
		parentId: comment._id,
	};
	console.log(sortedComment[comment._id]);

	return (
		<div
			className={"comment-container"}
			style={rootComment === true ? { padding: "0.5rem", width: "100" } : null}
		>
			<div className="header">
				<img src={img} alt={`${name} Profile pic`} />
				<div className="userName">{name}</div>
			</div>
			<p className="commentText">{comment.commentText}</p>
			<div className="reply-text-box">
				<input
					onChange={chnageHandler}
					value={commentText}
					type="text"
					className="comment-box"
					placeholder="Reply..."
				/>
				<button
					className="comment-btn"
					onClick={() => clickHandler(JSON.stringify(replyData))}
				>
					post
				</button>
			</div>
			<div className="reply-comment-container">
				{sortedComment[comment._id] !== undefined
					? sortedComment[comment._id].map((replies) => {
							console.log(replies);
							return (
								<CommentMarkup
									key={replies._id}
									comment={replies}
									clickHandler={clickHandler}
									postId={postId}
									sortedComment={sortedComment}
								/>
							);
					  })
					: console.log("null")}
			</div>
		</div>
	);
};
