import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Navbar from "./Navbar";

const isFileImage = (file) => {
	return file && file["type"].split("/")[0] === "image";
};

const EditProfile = (props) => {
	const history = useHistory();
	const [myUser, setMyUser] = useState(null);
	const [fullname, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [selectedImg, setSelectedImg] = useState();
	const [imageUrl, setImageUrl] = useState("");
	const defaultImgUrl =
		"https://res.cloudinary.com/harshith4802/image/upload/v1662654964/posts/yxi8vm6hhgnx8hkbwycu.png";
	useEffect(() => {
		if (!selectedImg) {
			if (myUser) {
				setImageUrl(myUser.profile_pic_url);
			} else {
				setImageUrl(defaultImgUrl);
			}
			return;
		}
		const imginput = document.getElementById("formFile");
		if (!isFileImage(selectedImg)) {
			imginput.value = null;
			if (myUser) {
				setImageUrl(myUser.profile_pic_url);
			} else {
				setImageUrl(defaultImgUrl);
			}
			imginput.classList.add("is-invalid");
			return;
		}
		imginput.classList.add("is-valid");
		const getImageUrl = URL.createObjectURL(selectedImg);
		setImageUrl(getImageUrl);

		return () => URL.revokeObjectURL(getImageUrl);
	}, [selectedImg, myUser]);

	if (!myUser) {
		axios.get("/api/check-login").then((res) => {
			console.log(res);
			if (!res.data.loggedIn) {
				history.push("/login");
			} else {
				setMyUser(res.data.user);
				setFullname(res.data.user.fullname);
				setUsername(res.data.user.username);
			}
		});
		return <Loader />;
	}

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
		console.log(fullname, username, password);
		const formData = new FormData();
		const imagefile = document.getElementById("formFile");
		formData.append("fullname", fullname);
		formData.append("username", username);
		formData.append("password", password);
		formData.append("image", imagefile.files[0]);
		console.log(formData);
		try {
			axios.post("/api/edit-profile", formData).then((res) => {
				console.log(res);
				if (res.data.duplicateUsername) {
					document.getElementById("fullname").value = "";
					document.getElementById("username").value = "";
					document.getElementById("password").value = "";
					form.classList.remove("was-validated");
					const alert = document.getElementById("alert");
					alert.classList.remove("d-none");
				} else {
					document.getElementById("submitButton").disabled = true;
					document.getElementById("loader").classList.remove("visually-hidden");
					document
						.getElementById("buttonText")
						.classList.add("visually-hidden");
					history.push("/profile");
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Navbar />
			<div className='container'>
				<h1 className='display-1 my-1 text-center'>Edit Profile</h1>
				<div className=' center shadow p-4 mx-auto bg-body border rounded-4 row justify-content-evenly mt-2'>
					<form
						method='post'
						id='form'
						onSubmit={handleSubmit}
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
								value={fullname}
								onChange={(e) => setFullname(e.target.value)}
								required
								maxLength='10'
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
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								maxLength='10'
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
								maxLength='40'
							/>
							<label htmlFor='floatingPassword'>Password</label>
						</div>
						<div className='text-center'>
							<button
								id='submitButton'
								type='submit'
								className='btn btn-primary btn-block btn-lg mt-3'
							>
								<span
									id='loader'
									className='spinner-border spinner-border-sm visually-hidden'
									role='status'
									aria-hidden='true'
								></span>
								<span id='buttonText'>Edit Profile</span>
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
			</div>
		</div>
	);
};

export default EditProfile;
