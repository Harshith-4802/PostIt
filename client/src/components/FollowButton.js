import axios from "axios";
import "../index.css";

const FollowButton = (props) => {
	const unfollow = async () => {
		const followButtons = document.getElementsByClassName(props.followId);
		console.log("deleting", props.username);
		await axios.post("/api/unfollow", {
			friendUserName: props.username,
		});
		for (let b of followButtons) {
			b.innerHTML = "Follow";
			b.classList.remove("followed");
		}
	};

	const follow = async () => {
		const followButtons = document.getElementsByClassName(props.followId);
		if (followButtons[0].innerHTML === "Unfollow") {
			unfollow();
			return;
		}
		await axios.post("/api/follow", {
			friendUserName: props.username,
		});
		for (let b of followButtons) {
			b.innerHTML = "Unfollow";
			b.classList.add("followed");
		}
	};

	return (
		<button
			onClick={follow}
			data-bs-toggle='button'
			className={`border-0 rounded-1 draw-border followed ${props.followId}`}
			// className={`btn btn-outline-secondary rounded-1 ${props.followId}`}
			style={{
				backgroundColor: "FDEFF4",
				height: "100%",
				width: "100%",
				fontFamily: "Comic Sans MS",
			}}
		>
			{props.text}
		</button>
	);
};

export default FollowButton;
