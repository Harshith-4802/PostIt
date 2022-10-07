import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../index.css";
import FollowButton from "./FollowButton";

const Suggestions = () => {
	const [users, setUsers] = useState(null);
	const history = useHistory();
	const profileClick = (profileUsername) => {
		history.push(`/profile/${profileUsername}`);
	};
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
							style={{
								width: "2.5rem",
								height: "2.5rem",
								borderRadius: "50%",
								cursor: "pointer",
							}}
							src={user.profile_pic_url}
							onClick={() => {
								profileClick(user.username);
							}}
							className='img-responsive'
							alt='dummydp'
						/>
					</div>
					<div
						className=' fs-3 col-6'
						onClick={() => {
							profileClick(user.username);
						}}
						style={{ cursor: "pointer" }}
					>
						{user.username}
					</div>
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
		setUsers(u);
	};
	getUsers();
	return <div>{users}</div>;
};

export default Suggestions;
