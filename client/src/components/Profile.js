import axios from "axios";
import { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";
import FollowButton from "./FollowButton";
import Navbar from "./Navbar";

const Profile = () => {
	const history = useHistory();
	const [posts, setPosts] = useState(null);
	const [myUser, setMyUser] = useState(null);
	const [profileUser, setProfileUser] = useState(null);
	var { id } = useParams();
	if (!myUser) {
		axios.get("/api/check-login").then((res) => {
			if (!res.data.loggedIn) {
				history.push("/login");
			} else {
				setMyUser(res.data.user);
			}
		});
		return <Loader />;
	}
	const getPosts = async () => {
		if (posts) return;
		if (!id) {
			id = myUser.username;
		}
		const res = await axios.get("/api/profile", {
			params: {
				username: id,
			},
		});
		if (!res.data.user) {
			setPosts(-1);
		}
		setProfileUser(res.data.user);
		const p = res.data.user.posts.map((post) => {
			return (
				<img
					key={post._id}
					className=' shadow-lg mx-2 bg-body img-fluid rounded-5 my-1 my-sm-3'
					src={post.img_url}
					style={{ width: "100%" }}
				></img>
			);
		});
		setPosts(p);
	};

	getPosts();
	if (!posts) return <Loader />;
	if (posts === -1) {
		return (
			<div>
				<Navbar />
				<div className='display-2 text-center'>Invalid Username</div>;
			</div>
		);
	}

	const profilebtn =
		myUser.username !== profileUser.username ? (
			<FollowButton
				username={profileUser.username}
				followId={profileUser.username}
				text={myUser.friends.includes(profileUser._id) ? "Unfollow" : "Follow"}
			/>
		) : (
			<Link to='/edit-profile'>
				<button
					style={{ height: "100%", width: "100%" }}
					className='btn btn-outline-dark fs-6'
				>
					Edit Profile
				</button>
			</Link>
		);

	return (
		<div>
			<Navbar />
			<div className='container mt-4'>
				<div className='mx-auto col-sm-8 col-10 shadow-lg  bg-body rounded-5 card'>
					<div className='row justify-content-center g-0'>
						<div className='col-md-3 col-10'>
							<img
								src={profileUser.profile_pic_url}
								className='img-fluid p-3'
								style={{ borderRadius: "50%", width: "100%", height: "100%" }}
								alt='...'
							/>
						</div>
						<div className='col-md-6'>
							<div className='card-body pt-0'>
								<h5 className='display-1 text-center my-sm-4'>
									{profileUser.username}
								</h5>
								<div className='mx-auto' style={{ height: "3rem" }}>
									{profilebtn}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='row mt-3 '>
					<div className='col-6 p-1 p-sm-3'>
						{posts.slice(0, posts.length / 2)}
					</div>
					<div className='col-6 p-1 p-sm-3'>
						{posts.slice(posts.length / 2)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
