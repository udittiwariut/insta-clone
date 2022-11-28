import { useRef, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { feedPost } from "../../store/feed_post/feedPost";
import { Feed_page_main } from "./feed_page_main";
import Loader from "./../../logos/loader/loader";
import { useDispatch } from "react-redux";
import { config } from "../../servise/axios";
import axios from "axios";
import { useEffect } from "react";

export const FeedPage = () => {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const dispatch = useDispatch();

	const data = async () => {
		const feeds = await axios.get(
			`http://localhost:5000/api/v1/post?page=${page}`,
			config
		);

		if (feeds?.data?.data?.posts.length === 0) {
			setHasMore(false);
		}
		dispatch(feedPost(feeds?.data?.data?.posts));
	};
	const posts = useSelector((state) => state.feedPosts.feedPost);

	useEffect(() => {
		data();
	}, [page, dispatch]);

	const observer = useRef();
	const lastPostElement = useCallback((node) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setPage(page + 1);
			}
		});
		if (node) observer.current.observe(node);
	}, []);
	if (posts.length === 0) {
		return <Loader />;
	} else if (posts.length > 0) {
		return posts.map((post, index) => {
			if (posts.length === index + 1) {
				return (
					<div ref={lastPostElement} key={post._id}>
						: <Feed_page_main post={post} />
					</div>
				);
			} else {
				return (
					<div key={post._id}>
						<Feed_page_main post={post} />
					</div>
				);
			}
		});
	}
};
