import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AddPost from "./AddPost";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";

export default () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Route path='/' component={() => <Redirect to='/home' />} />
					<Route path='/home' component={() => <Home />} />
					<Route path='/sign-up' component={() => <SignUp />} />
					<Route path='/login' component={() => <Login />} />
					<Route path='/add-post' component={() => <AddPost />} />
				</div>
			</BrowserRouter>
		</div>
	);
};
