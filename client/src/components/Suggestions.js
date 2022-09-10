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
				<div className='border rounded-3 container row p-2'>
					<div className='col-2'>
						<img
							style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
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
		// console.log(users);
	};
	getUsers();
	return (
		<div>
			<ul className='list-group'>{users}</ul>
		</div>
	);
};

export default Suggestions;
