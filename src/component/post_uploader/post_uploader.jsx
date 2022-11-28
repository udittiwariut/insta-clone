import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { ReactComponent as MediaAndFileLogo } from "./../../logos/media&file.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { makePostRequest } from "../../servise/axios";
import { makePatchRequest } from "../../servise/axios";
import {
	isPostBoxOpenByNav,
	isPostBoxOpenByDropDown,
} from "../../store/postBoxToggel/postBoxToggelReducer";
import { userSelector } from "../../store/user/userSelector";
import "./post_uploader.css";

export const PostUploader = (props) => {
	const ref = useRef(null);
	const dispatch = useDispatch();
	const [token, setToken] = useState("");
	const [postBox, SetPostBox] = useState(true);
	const [caption, setCaption] = useState("");
	const [postImgPreview, setPostImgPreview] = useState(false);
	const [postImg, setpostImg] = useState("");

	const userData = useSelector(userSelector);

	const postHnadler = async () => {
		let data = { img: postImg, caption: caption };

		try {
			if (props.profilePic === true) {
				let data = { img: postImg };
				console.log(token);

				const res = await makePatchRequest(
					"user/profile_pic",
					JSON.stringify(data),
					token
				);
				console.log(res);
			} else {
				const res = await makePostRequest("post", JSON.stringify(data), token);
				console.log(res);
			}

			console.log(`post updated succesfully`);
			SetPostBox(!postBox);
		} catch (error) {
			console.log(error.message);
		}
	};

	const onDragEnter = () =>
		ref.current.classList.add("uploadPostBox_body_drag");

	const onDragleave = () =>
		ref.current.classList.remove("uploadPostBox_body_drag");

	const onDragDrop = () =>
		ref.current.classList.remove("uploadPostBox_body_drag");

	const ondrop = async (e) => {
		const image = e.target.files[0];
		let maxWidthOrHeight = 600;
		if (props.profilePic) {
			maxWidthOrHeight = 400;
		}
		const compressedImg = await imageCompression(image, {
			maxWidthOrHeight: maxWidthOrHeight,
		});
		const reader = new FileReader();

		reader.onloadend = () => {
			setpostImg(reader.result);
			setPostImgPreview(true);
		};
		reader.readAsDataURL(compressedImg);
	};

	useEffect(() => {
		function userInfo() {
			if (userData.token) {
				setToken(userData.token);
			}
		}
		return userInfo();
	}, [userData]);

	const uploadPostBoxClickHandler = () => {
		dispatch(isPostBoxOpenByDropDown(false));
		dispatch(isPostBoxOpenByNav(false));
	};

	if (postBox === true) {
		return (
			<div className="uploadPostBox">
				<div className="uploadPostBox_opt">
					<div className="uploadPostBox_header">
						{props.profilePic
							? `Upload new Porfile Picture `
							: `Create new post`}
						<div
							className="uploadPostBox_imgPreview_btn_cancel"
							onClick={uploadPostBoxClickHandler}
						>
							{<AiOutlineCloseCircle color="black" size={25} />}
						</div>
					</div>
					{postImgPreview ? (
						<>
							<div className="uploadPostBox_imgPreview">
								<img src={postImg} alt={"img"}></img>
								<button
									className="uploadPostBox_imgPreview_btn_post"
									onClick={postHnadler}
								>
									Post
								</button>

								<div className="uploadPostBox_caption">
									<input
										type="text"
										value={caption}
										placeholder={"Write an Caption"}
										onChange={(e) => setCaption(e.target.value)}
									/>
								</div>
							</div>
						</>
					) : (
						<>
							<div
								className="uploadPostBox_body"
								ref={ref}
								onDragEnter={onDragEnter}
								onDragLeave={onDragleave}
								onDrop={onDragDrop}
							>
								<MediaAndFileLogo />
								<input type={"file"} accept={"image/*"} onChange={ondrop} />
								<p>Drag and drop your file hear</p>
								<button className="upload-btn">Upload photo</button>
							</div>
						</>
					)}
				</div>
			</div>
		);
	} else {
		return null;
	}
};
