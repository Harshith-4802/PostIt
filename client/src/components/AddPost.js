import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";

const AddPost = () => {
	const history = useHistory();
	const [user, setUser] = useState(null);
	const [desc, setDesc] = useState("");
	const [selectedImg, setSelectedImg] = useState();
	const [imageUrl, setImageUrl] = useState();
	useEffect(() => {
		if (!selectedImg) {
			setImageUrl(undefined);
			return;
		}

		const getImageUrl = URL.createObjectURL(selectedImg);
		setImageUrl(getImageUrl);

		return () => URL.revokeObjectURL(getImageUrl);
	}, [selectedImg]);
	if (!user) {
		axios.get("/api/check-login").then((res) => {
			console.log(res);
			if (!res.data.loggedIn) {
				history.push("/login");
			} else {
				setUser(res.data.user);
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
		const formData = new FormData();
		const imagefile = document.getElementById("formFile");
		formData.append("desc", desc);
		formData.append("image", imagefile.files[0]);
		console.log(formData);
		try {
			axios
				.post("/api/add-post", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					console.log(res);
					document.getElementById("submitButton").disabled = true;
					document.getElementById("loader").classList.remove("visually-hidden");
					document
						.getElementById("buttonText")
						.classList.add("visually-hidden");
					history.push("/profile");
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Navbar />
			<div className='container mx-auto row justify-content-evenly'>
				<form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					method='POST'
					className='shadow p-4 bg-body col-md-6 border rounded-4 my-auto'
				>
					<h1 className='display-3 text-center'>Add a New Post</h1>
					<div className='mb-3'>
						<label htmlFor='formFile' className='form-label'>
							Insert an Image file for your post
						</label>
						<input
							className='form-control'
							type='file'
							id='formFile'
							name='image'
							accept='image/*'
							onChange={fileChange}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='formDescription' className='form-label'>
							Add a description here
						</label>
						<input
							className='form-control'
							type='text'
							name='desc'
							id='formDescription'
							onChange={(e) => {
								setDesc(e.target.value);
							}}
						/>
					</div>
					<div className='d-grid gap-2 d-md-flex justify-content-center'>
						<button
							type='submit'
							id='submitButton'
							className='btn col btn-primary btn-lg align-center mt-3'
						>
							<span
								id='loader'
								className='spinner-border spinner-border-sm visually-hidden'
								role='status'
								aria-hidden='true'
							></span>
							<span id='buttonText'>Post</span>
						</button>
					</div>
				</form>
				<div className='col-md-6 px-sm-4 px-0'>
					<h3 className='display-6 text-center mt-md-0 mt-3'>Preview</h3>
					<Post
						user={user}
						desc={desc}
						img_url={imageUrl}
						liked={false}
						numLikes={0}
						likeDisable={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddPost;
