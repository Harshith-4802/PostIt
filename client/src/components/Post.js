// import axios from "axios";
// import "../index.css";

import FollowButton from "./FollowButton";

const Post = (props) => {
	const img_url =
		props.img_url ||
		"https://res.cloudinary.com/harshith4802/image/upload/v1662654964/posts/yxi8vm6hhgnx8hkbwycu.png";
	const id = props.id || 0;
	const heartId = `heart-${id}`;
	const followId = `follow-${props.user.username}`;

	const playHeart = () => {
		const heartDiv = document.getElementById(heartId);
		heartDiv.classList.toggle("is-active");
	};

	// const unfollow = async () => {
	// 	const followButtons = document.getElementsByClassName(followId);
	// 	console.log("deleting", props.user.username);
	// 	const res = await axios.post("/api/unfollow", {
	// 		friendUserName: props.user.username,
	// 	});
	// 	for (let b of followButtons) {
	// 		b.innerHTML = "Follow";
	// 		b.classList.remove("followed");
	// 	}
	// };

	// const follow = async () => {
	// 	const followButtons = document.getElementsByClassName(followId);
	// 	if (followButtons[0].innerHTML === "Unfollow") {
	// 		unfollow();
	// 		return;
	// 	}
	// 	const res = await axios.post("/api/follow", {
	// 		friendUserName: props.user.username,
	// 	});
	// 	for (let b of followButtons) {
	// 		b.innerHTML = "Unfollow";
	// 		b.classList.add("followed");
	// 	}
	// };

	return (
		<div className='shadow-lg p-3 mb-5 bg-body rounded card mx-auto mb-5'>
			<div className='card-title row justify-content-center'>
				<div className='col-2 col-sm-1 my-2 px-0 ml-3'>
					<img
						style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
						src={props.user.profile_pic_url}
						className='img-responsive mx-auto'
						alt='dummydp'
					/>
				</div>
				<div className='my-2 mx-2 px-0 display-6 col-sm-6 col-4'>
					{props.user.username}
				</div>
				{/* <button
					onClick={follow}
					data-bs-toggle='button'
					className={`border-0 rounded-1 draw-border p-0 col-3 followed ${followId}`}
				>
					Unfollow
				</button> */}
				<div className='col-sm-4 py-1 col-5 fs-5'>
					<FollowButton
						username={props.user.username}
						followId={followId}
						text='Unfollow'
					/>
				</div>
			</div>
			<img
				src={img_url}
				className='card-img-top img-fluid border border-5 rounded-4'
				alt='dummy'
			/>
			<div className='text-top card-body py-0 row justify-content-between'>
				<p className='card-text col-9 pt-3 px-0'>{props.desc}</p>
				<div id={heartId} className='heart col-3' onClick={playHeart}></div>
			</div>
		</div>
	);
};
export default Post;
