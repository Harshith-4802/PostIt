import axios from "axios";
import { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";
import FollowButton from "./FollowButton";
import Navbar from "./Navbar";
import Post from "./Post";

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
			history.push(`/profile/${myUser.username}`);
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
		res.data.user.posts.sort((a, b) =>
			a.date < b.date ? 1 : b.date < a.date ? -1 : 0
		);
		const p = res.data.user.posts.map((post) => {
			let liked = false;
			if (post.likes.includes(myUser._id)) {
				liked = true;
			}
			return (
				<div key={post._id}>
					<img
						className=' shadow-lg mx-2 bg-body img-fluid rounded-5 my-1 my-sm-3'
						src={post.img_url}
						style={{ cursor: "pointer", width: "100%" }}
						data-bs-toggle='modal'
						data-bs-target={`#postModal-${post._id}`}
					></img>
					<div
						className='modal fade'
						id={`postModal-${post._id}`}
						tabIndex='-1'
						aria-labelledby='postModalLabel'
						aria-hidden='true'
					>
						<div className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'>
							<div className='modal-content'>
								<div className='modal-header justify-content-end p-0'>
									<button
										type='button'
										className='btn-close m-1 float-end'
										aria-label='Close'
										data-bs-target={`#postModal-${post._id}`}
										data-bs-toggle='modal'
									></button>
								</div>
								<div className='modal-body p-0'>
									<Post
										date={post.date}
										id={post._id}
										user={res.data.user}
										desc={post.desc}
										img_url={post.img_url}
										liked={liked}
										numLikes={post.likes.length}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
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
			<Navbar user={myUser} />
			<div className='container mt-4'>
				<div className='mx-auto col-sm-8 col-10 shadow-lg  bg-body rounded-5 card'>
					<div className='row justify-content-center g-0'>
						<div className='col-md-3 col-10 '>
							<img
								src={profileUser.profile_pic_url}
								className='img-fluid p-3'
								style={{
									borderRadius: "50%",
									width: "15rem",
									height: "15rem",
								}}
								alt='...'
							/>
						</div>
						<div className='col-md-6'>
							<div className='card-body pt-0'>
								<h5 className='display-3 text-center my-sm-4'>
									{profileUser.username}
								</h5>
								<div className='mx-auto' style={{ height: "3rem" }}>
									{profilebtn}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='row container mx-0 px-0 mt-3 '>
					<div className='col-6 p-1 p-sm-3'>
						{posts.length > 1 ? posts.slice(0, posts.length / 2) : posts}
					</div>
					<div className='col-6 p-1 p-sm-3'>
						{posts.length > 1 ? posts.slice(posts.length / 2) : []}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
