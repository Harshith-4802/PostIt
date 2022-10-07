import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AddPost from "./AddPost";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

export default () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Route path='/' exact component={() => <Redirect to='/home' />} />
					<Route path='/home' component={() => <Home />} />
					<Route path='/sign-up' component={() => <SignUp />} />
					<Route path='/login' component={() => <Login />} />
					<Route path='/add-post' component={() => <AddPost />} />
					<Route path='/edit-profile' component={() => <EditProfile />} />
					<Route path='/profile/:id' component={() => <Profile />} />
					<Route exact path='/profile' component={() => <Profile />} />
				</div>
			</BrowserRouter>
		</div>
	);
};
