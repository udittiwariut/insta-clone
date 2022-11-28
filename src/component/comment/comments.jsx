import React from "react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comments } from "../../store/comment/commentReducer";
import { CommentMarkup } from "./comment-markup";
import { configFalseCredentials } from "../../servise/axios";
import "./comments.css";

export const Comment = ({ id }) => {
	const dispatch = useDispatch();

	const [commnet, setCommnet] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [loading, setLoading] = useState(false);

	const sortComment = useMemo(() => {
		const sortedComment = {};
		commnet.map((cmt) => {
			sortedComment[cmt.parentId] ||= [];
			sortedComment[cmt.parentId].push(cmt);
		});
		console.log("log from sort comment");
		return sortedComment;
	}, [commnet]);
	console.log(sortComment);
	const getCmt = async () => {
		setLoading(true);

		const comments = await axios.get(
			`http://127.0.0.1:5000/api/v1/comment/${id}`,
			configFalseCredentials
		);

		setCommnet(comments?.data?.comments);
		setLoading(false);
	};

	const rootComment = JSON.stringify({ postId: id, commentText: commentText });

	const clickHandler = async (Data) => {
		try {
			setLoading(true);

			let data = Data;

			const newComment = await axios
				.post(
					`http://127.0.0.1:5000/api/v1/comment`,
					data,
					configFalseCredentials
				)
				.then((newComment) =>
					setCommnet([...commnet, newComment?.data?.comment])
				);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const chnageHandler = async (e) => {
		setCommentText(e.target.value);
	};

	useEffect(() => {
		getCmt();
	}, [id]);

	return (
		<div className="comment-wrapper">
			<div className="comment-wrapper-post">
				<input
					onChange={chnageHandler}
					value={commentText}
					type="text"
					className="comment-box"
					placeholder="Add a comment"
				/>
				<button
					className="comment-btn"
					onClick={() => clickHandler(rootComment)}
				>
					post
				</button>
			</div>
			<div className="comments-container">
				{loading
					? "...loading"
					: sortComment[null]?.map((cmt) => {
							return (
								<div className="reply-cointainer" key={cmt._id}>
									<CommentMarkup
										comment={cmt}
										clickHandler={clickHandler}
										postId={id}
										sortedComment={sortComment}
										rootComment={true}
									/>
								</div>
							);
					  })}
			</div>
		</div>
	);
};
