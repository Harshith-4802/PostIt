import React, { Suspense } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Loader from "./Loader";

// import AddPost from "./AddPost";
// import SignUp from "./SignUp";
// import Login from "./Login";
// import Home from "./Home";
// import Profile from "./Profile";
// import EditProfile from "./EditProfile";

const AddPost = React.lazy(() => import("./AddPost"));
const SignUp = React.lazy(() => import("./SignUp"));
const Login = React.lazy(() => import("./Login"));
const Home = React.lazy(() => import("./Home"));
const Profile = React.lazy(() => import("./Profile"));
const EditProfile = React.lazy(() => import("./EditProfile"));

export default () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Suspense fallback={<Loader />}>
						<Route path='/' exact component={() => <Redirect to='/home' />} />
						<Route path='/home' component={() => <Home />} />
						<Route path='/sign-up' component={() => <SignUp />} />
						<Route path='/login' component={() => <Login />} />
						<Route path='/add-post' component={() => <AddPost />} />
						<Route path='/edit-profile' component={() => <EditProfile />} />
						<Route path='/profile/:id' component={() => <Profile />} />
						<Route exact path='/profile' component={() => <Profile />} />
					</Suspense>
				</div>
			</BrowserRouter>
		</div>
	);
};
