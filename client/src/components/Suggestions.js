import axios from "axios";
import { useState } from "react";
import "../index.css";
import FollowButton from "./FollowButton";

const Suggestions = () => {
	const [users, setUsers] = useState(null);
	const getUsers = async () => {
		if (users) return;
		const res = await axios.get("/api/users");
		const u = res.data.map((user) => {
			return (
				<div
					key={user.username}
					className='border rounded-3 mx-1 p-2 shadow-lg bg-body mb-1 row '
				>
					<div className='col-2'>
						<img
							style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
							src={user.profile_pic_url}
							className='img-responsive'
							alt='dummydp'
						/>
					</div>
					<div className=' fs-3 col-6'>{user.username}</div>
					<div className='col-4 '>
						<FollowButton
							username={user.username}
							followId={user.username}
							text='Follow'
						/>
					</div>
				</div>
			);
		});
		console.log(u);
		setUsers(u);
	};
	getUsers();
	return <div>{users}</div>;
};

export default Suggestions;
