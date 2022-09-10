import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import Navbar from "./Navbar";
import Suggestions from "./Suggestions";

const Home = () => {
	const history = useHistory();
	const [posts, setPosts] = useState(null);
	const getPosts = async () => {
		if (posts) return;
		const res = await axios.get("/api/home");
		console.log(res);
		if (!res.data.loggedIn) {
			history.push("/login");
			return;
		} else {
			console.log(res.data.friends);
			if (!res.data.friends || res.data.friends.length === 0) {
				const p = (
					<div
						className='display-1'
						style={{
							width: "30rem",
							height: "30rem",
							position: "absolute",
							textAlign: "center",
							verticalAlign: "middle",
							lineHeight: "30rem",
							top: "0",
							bottom: "0",
							left: "0",
							right: "0",
							margin: "auto",
						}}
					>
						No Posts Yet
					</div>
				);
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
		}
	};
	getPosts();
	return (
		<div>
			<Navbar />
			<div className='row justify-content-end'>
				<div className='col-md-5 mt-4'>{posts}</div>
				<div className='col-md-4 my-3 mx-2 px-2'>
					<div className='text-center fs-3 my-3'>Suggestions</div>
					<Suggestions />
				</div>
			</div>
		</div>
	);
};

export default Home;
