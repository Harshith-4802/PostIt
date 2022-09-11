import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import Navbar from "./Navbar";
import Suggestions from "./Suggestions";
import Loader from "./Loader";

const Home = () => {
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
		const res = await axios.get("/api/home");
		console.log(res.data.friends);
		if (!res.data.friends || res.data.friends.length === 0) {
			const p = <div className='display-3'>No Posts Yet</div>;
			setPosts(p);
		} else {
			const p = res.data.friends.map((friend) => {
				return friend.posts.map((post) => (
					<Post
						key={post._id}
						id={post._id}
						user={friend}
						desc={post.desc}
						img_url={post.img_url}
					/>
				));
			});
			setPosts(p);
		}
	};
	getPosts();
	return (
		<div>
			<Navbar />
			<div className='row justify-content-center m-0 p-0'>
				<div className='col-md-7 mt-4'>{posts}</div>
				<div className='container col-md-4 my-3 mx-2 px-2'>
					<div className='text-center my-3'>Suggestions</div>
					<Suggestions />
				</div>
			</div>
		</div>
	);
};

export default Home;
