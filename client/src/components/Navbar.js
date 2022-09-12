import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
	const history = useHistory();
	const removeUserId = async () => {
		await axios.post("/api/logout");
		history.push("/login");
	};

	return (
		<nav className='navbar navbar-expand-sm bg-light'>
			<div className='container-fluid'>
				<button className='btn fs-3 py-0 navbar-brand' disabled href='#'>
					Post It
				</button>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavAltMarkup'
					aria-controls='navbarNavAltMarkup'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse flex-row-reverse'
					id='navbarNavAltMarkup'
					// style={{ display: "flex", justifyContent: "flex-end" }}
				>
					<div className='navbar-nav'>
						<Link to='/home'>
							<button className='btn fs-6'>Home</button>
						</Link>
						<Link to='/profile'>
							<button className='btn fs-6'>Profile</button>
						</Link>
						<Link to='/add-post'>
							<button className='btn fs-6'>Add new Post</button>
						</Link>
						<button
							className='btn btn-outline-dark fs-6'
							onClick={removeUserId}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
