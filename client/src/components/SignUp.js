import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const isFileImage = (file) => {
	return file && file["type"].split("/")[0] === "image";
};

const SignUp = () => {
	const defaultImgUrl =
		"https://res.cloudinary.com/harshith4802/image/upload/v1662654964/posts/yxi8vm6hhgnx8hkbwycu.png";
	const [fullname, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [selectedImg, setSelectedImg] = useState();
	const [imageUrl, setImageUrl] = useState(defaultImgUrl);
	const history = useHistory();
	useEffect(() => {
		if (!selectedImg) {
			setImageUrl(defaultImgUrl);
			return;
		}
		const imginput = document.getElementById("formFile");
		if (!isFileImage(selectedImg)) {
			imginput.value = null;
			setImageUrl(defaultImgUrl);
			imginput.classList.add("is-invalid");
			console.log(imginput);
			return;
		}
		imginput.classList.add("is-valid");
		const getImageUrl = URL.createObjectURL(selectedImg);
		setImageUrl(getImageUrl);

		return () => URL.revokeObjectURL(getImageUrl);
	}, [selectedImg]);

	const fileChange = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedImg(undefined);
			return;
		}
		setSelectedImg(e.target.files[0]);
	};

	let handleSubmit = async (e) => {
		e.preventDefault();
		const form = document.getElementById("form");
		form.classList.add("was-validated");
		if (!form.checkValidity()) {
			e.stopPropagation();
			return;
		}
		const formData = new FormData();
		const imagefile = document.getElementById("formFile");
		formData.append("fullname", fullname);
		formData.append("username", username);
		formData.append("password", password);
		formData.append("image", imagefile.files[0]);
		console.log(formData);
		try {
			axios.post("/api/sign-up", formData).then((res) => {
				console.log(res);
				if (res.data.duplicateUsername) {
					document.getElementById("fullname").value = "";
					document.getElementById("username").value = "";
					document.getElementById("password").value = "";
					form.classList.remove("was-validated");
					const alert = document.getElementById("alert");
					alert.classList.remove("d-none");
				} else {
					history.push("/home");
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='container'>
			<h1 className='display-1 my-4 text-center'>Sign Up</h1>
			<div className=' center shadow p-4 mx-auto bg-body border rounded-4 row justify-content-evenly mt-2'>
				<form
					method='post'
					id='form'
					onSubmit={handleSubmit}
					// action='http://localhost:8080/sign-up'
					className='form-floating col-sm-6 align-self-center'
					noValidate
				>
					<div
						id='alert'
						className='alert alert-danger alert-dismissible d-none'
						role='alert'
					>
						<div>Username Already Taken</div>
					</div>
					<div className='form-floating mb-3'>
						<input
							type='text'
							className='form-control'
							id='fullname'
							placeholder='Fullname'
							name='fullname'
							onChange={(e) => setFullname(e.target.value)}
							required
						/>
						<label htmlFor='floatingInput'>Full Name</label>
					</div>
					<div className='form-floating mb-3'>
						<input
							type='text'
							className='form-control'
							id='username'
							placeholder='Username'
							name='username'
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<label htmlFor='floatingInput'>Username</label>
					</div>
					<div className='form-floating mb-3'>
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor='floatingPassword'>Password</label>
					</div>
					<div className='text-center'>
						<button
							type='submit'
							className='btn btn-primary mr-5 btn-block btn-lg mt-3'
						>
							Sign Up
						</button>
					</div>
				</form>
				<div className='mb-3 col-sm-3'>
					<div className='col'>
						<div className='row justify-content-center'>
							<h3 className='display-6 text-center mt-3'>Profile Picture</h3>
							<img
								src={imageUrl}
								className='img-responsive col-5 mt-2 mb-4'
								alt='profile-pic'
								style={{
									borderRadius: "50%",
									// objectFit: "scale-down",
									objectPosition: "center",
									// width: "100%",
									// maxHeight: "200px",
									width: "15rem",
									height: "15rem",
								}}
							/>
							<div id='imgfilediv'>
								<input
									className='form-control '
									type='file'
									id='formFile'
									name='image'
									accept='image/*'
									onChange={fileChange}
								/>
								<div className='invalid-feedback'>Invalid File format</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='col-6 mt-2 text-end'>Already Signed Up?</div>
				<button
					className='btn btn-primary col-md-1 col-3 btn-block'
					onClick={() => history.push("/login")}
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default SignUp;
