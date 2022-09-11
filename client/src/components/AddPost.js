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
					history.push("/home");
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
					className='shadow p-4 bg-body col-6 border rounded-4 my-auto'
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
							className='btn col btn-primary btn-lg align-center mt-3'
						>
							Post
						</button>
					</div>
				</form>
				<div className='col-5'>
					<h3 className='display-6 text-center'>Preview</h3>
					<Post user={user} desc={desc} img_url={imageUrl} />
				</div>
			</div>
		</div>
	);
};

export default AddPost;
