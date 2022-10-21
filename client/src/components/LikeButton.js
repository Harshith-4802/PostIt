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
		if (!props.likeDisable) {
			axios.post("/api/dislike", { postId: props.postId });
		}
		setLiked(false);
	};

	const like = async () => {
		if (liked) {
			dislike();
			return;
		}
		if (!props.likeDisable) {
			axios.post("/api/like", { postId: props.postId });
		}
		setLiked(true);
	};

	return (
		<div
			id={heartId}
			className='heart col-3'
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-end",
				fontSize: "small",
				fontFamily: "Varela Round",
				fontWeight: "bold",
			}}
			onClick={like}
		>
			<div className='text-center'>
				{liked === props.liked
					? props.numLikes
					: liked
					? props.numLikes + 1
					: props.numLikes - 1}
			</div>
		</div>
	);
};

export default LikeButton;
