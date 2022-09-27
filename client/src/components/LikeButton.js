import "../index.css";
import axios from "axios";
import { useEffect, useState } from "react";

const LikeButton = (props) => {
	const heartId = `heart-${props.postId}`;
	const [liked, setLiked] = useState(props.liked);
	const playHeart = () => {
		const heartDiv = document.getElementById(heartId);
		if (liked) {
			heartDiv.classList.add("is-active");
		} else {
			heartDiv.classList.remove("is-active");
		}
	};
	useEffect(playHeart, [liked]);
	const dislike = async () => {
		axios.post("/api/dislike", { postId: props.postId });
		setLiked(false);
	};

	const like = async () => {
		if (liked) {
			dislike();
			return;
		}
		axios.post("/api/like", { postId: props.postId });
		setLiked(true);
	};

	return <div id={heartId} className='heart col-3' onClick={like}></div>;
};

export default LikeButton;
