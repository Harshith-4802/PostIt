import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	let handleSubmit = async (e) => {
		e.preventDefault();
		const form = document.getElementById("form");
		form.classList.add("was-validated");
		if (!form.checkValidity()) {
			e.stopPropagation();
			return;
		}
		try {
			axios
				.post("/api/login", {
					username,
					password,
				})
				.then((res) => {
					console.log(res.data);
					if (res.data.isValidUser) {
						history.push("/home");
					} else {
						document.getElementById("username").value = "";
						document.getElementById("password").value = "";
						const alert = document.getElementById("alert");
						alert.classList.remove("d-none");
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='container row justify-content-center mx-auto mt-5 row '>
			<div className='col-md-6'>
				<h1 className='display-1 text-center my-4 mx-auto'>Login</h1>
				<div className='shadow bg-body border p-5 rounded-4'>
					<div
						id='alert'
						className='alert alert-danger alert-dismissible d-none'
						role='alert'
					>
						<div>Invalid Username or Password</div>
					</div>
					<form
						method='post'
						onSubmit={handleSubmit}
						className='form-floating'
						id='form'
						noValidate
					>
						<div className='form-floating mb-3'>
							<input
								required
								type='text'
								className='form-control'
								id='username'
								placeholder='Username'
								name='username'
								aria-describedby='inputGroupPrepend'
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label htmlFor='floatingInput'>Username</label>
							<div className='invalid-feedback'>Please choose a username.</div>
						</div>
						<div className='form-floating'>
							<input
								required
								type='password'
								className='form-control'
								id='password'
								placeholder='Password'
								name='password'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label htmlFor='floatingPassword'>Password</label>
							<div className='invalid-feedback'>Please Enter a Password.</div>
						</div>

						<button
							type='submit'
							className='btn btn-primary mr-5 btn-block mt-3'
						>
							Sign in
						</button>
					</form>
				</div>
				<div className='container row mt-3 justify-content-center'>
					<div className='col-sm-6 col-8 mt-2 text-end'>
						Don't Have an Account Yet?
					</div>
					<button
						className='btn btn-primary col-4 btn-block'
						onClick={() => history.push("/sign-up")}
					>
						Create Account
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
