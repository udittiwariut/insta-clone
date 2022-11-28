import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { postSelector } from "../../store/post/postSelector";
import Loader from "../../logos/loader/loader";
const PostsContainer = () => {
	const postsData = useSelector(postSelector);
	console.log("lof from post cointer");
	const [posts, setPost] = useState({});

	useEffect(() => {
		const setPostData = () => {
			if (postsData !== undefined) {
				setPost(postsData);
			}
		};
		setPostData();
	}, [postsData]);
	return <div>{postsData !== undefined ? <h1>done</h1> : <Loader />}</div>;
};
export default PostsContainer;
