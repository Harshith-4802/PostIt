import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";
import FollowButton from "./FollowButton";
import Navbar from "./Navbar";

const Profile = () => {
	const history = useHistory();
	const [posts, setPosts] = useState(null);
	const [user, setUser] = useState(null);

	if (!user) {
		axios.get("/api/check-login").then((res) => {
			console.log(res);
			if (!res.data.loggedIn) {
				history.push("/login");
			} else {
				setUser(res.data.user);
			}
		});
		return <Loader />;
	}
	const getPosts = async () => {
		if (posts) return;
		const res = await axios.get("/api/profile");
		// console.log(res.data.user.posts);
		const p = res.data.user.posts.map((post) => {
			return (
				<img
					key={post._id}
					className=' shadow-lg  bg-body img-fluid rounded-5 my-1 my-sm-3'
					src={post.img_url}
				></img>
			);
		});
		setPosts(p);
	};

	getPosts();
	if (!posts) return <Loader />;
	return (
		<div>
			<Navbar />
			<div className='container mt-4'>
				<div className='mx-auto col-sm-8 col-10 shadow-lg  bg-body rounded-5 card'>
					<div className='row justify-content-center g-0'>
						<div className='col-md-3 col-10'>
							<img
								src={user.profile_pic_url}
								className='img-fluid p-3'
								style={{ borderRadius: "50%" }}
								alt='...'
							/>
						</div>
						<div className='col-md-6'>
							<div className='card-body pt-0'>
								<h5 className='display-1 text-center my-sm-4'>
									{user.username}
								</h5>
								<div className='mx-auto' style={{ height: "3rem" }}>
									<FollowButton
										username={user.username}
										followId={user.username}
										text='Unfollow'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='row mt-3'>
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
