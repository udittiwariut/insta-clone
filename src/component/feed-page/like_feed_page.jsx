import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makePutRequest } from "../../servise/axios";
import { FcLike } from "react-icons/fc";
import { BsHeart } from "react-icons/bs";
import "./like_feed_page.css";

export const LikeHnadler = ({ likes, postId }) => {
	const userId = useSelector((state) => state.user.user._id);

	const [likesCount, setLikesCount] = useState(likes);

	const clickHnadler = async () => {
		const likes = await makePutRequest(
			"post/like",
			JSON.stringify({ postId: postId })
		);
		console.log(likes.likes);
		setLikesCount(likes.likes);
	};

	const isLiked = likesCount.find((id) => {
		return id === userId;
	});

	return (
		<>
			{isLiked ? (
				<FcLike size={27} />
			) : (
				<BsHeart size={25} onClick={clickHnadler} />
			)}
			<div className="likeCount">{likesCount.length}</div>
		</>
	);
};
