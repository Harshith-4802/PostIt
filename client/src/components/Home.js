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
		if (!res.data.friends || res.data.friends.length === 0) {
			const p = (
				<div className='display-6'>
					No Friends Yet. Follow Someone and Refresh The Page.
				</div>
			);
			setPosts(p);
		} else {
			const p = [];
			res.data.friends.forEach((friend) => {
				friend.posts.forEach((post) => {
					let liked = false;
					if (post.likes.includes(user._id)) {
						liked = true;
					}
					p.push(
						<div key={post._id} date={post.date} className='mb-5'>
							<Post
								id={post._id}
								user={friend}
								desc={post.desc}
								img_url={post.img_url}
								liked={liked}
								numLikes={post.likes.length}
							/>
						</div>
					);
				});
			});
			p.sort((a, b) =>
				a.props.date < b.props.date ? 1 : b.props.date < a.props.date ? -1 : 0
			);
			setPosts(p);
		}
	};
	getPosts();
	return (
		<div>
			<Navbar user={user} />
			<div className='row justify-content-center m-0 p-0'>
				<div className='col-md-7 mt-4'>{posts}</div>
				<div className='container col-md-4 my-3 mx-2 px-2'>
					<div className='text-center fs-2 my-3'>Suggestions</div>
					<Suggestions />
				</div>
			</div>
		</div>
	);
};

export default Home;
