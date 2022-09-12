const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mongoose = require("mongoose");

const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: require("find-config")(".env") });
}

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "images",
		allowedFormaats: ["jpeg", "png", "jpg"],
	},
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(session({ secret: "ithinkthisisagoodsecret" }));
const mongdbUrl =
	process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/postit";

// const mongdbUrl = "mongodb://localhost:27017/postit";
mongoose
	.connect(mongdbUrl, { useNewUrlParser: true })
	.then(() => {
		if (mongdbUrl === "mongodb://localhost:27017/postit") {
			console.log("Local Mongo DB Connected!");
		} else {
			console.log("Atlas MongoDB Connected!");
		}
	})
	.catch((err) => {
		console.log("Error", err);
	});

const upload = multer({ storage });
const UserModel = require("./models/User");

app.post("/api/sign-up", upload.single("image"), async (req, res) => {
	const { fullname, username, password } = req.body;
	const user = await UserModel.findOne({ username });
	if (user != null) {
		// cloudinary.uploader.destroy()
		res.send({ duplicateUsername: true });
		return;
	}
	let profile_pic_url;
	if (!req.file) {
		profile_pic_url =
			"https://res.cloudinary.com/harshith4802/image/upload/v1662654964/posts/yxi8vm6hhgnx8hkbwycu.png";
	} else {
		profile_pic_url = req.file.path;
	}
	const hash = await bcrypt.hash(password, 12);
	const newUser = new UserModel({
		fullname,
		username,
		password: hash,
		profile_pic_url,
	});
	await newUser.save();
	req.session.username = username;
	res.send({ duplicateUsername: false });
});

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await UserModel.findOne({ username });
	if (!user) {
		res.send({ isValidUser: false });
		return;
	}
	const validUser = await bcrypt.compare(password, user.password);
	if (!validUser) {
		res.send({ isValidUser: false });
	} else {
		req.session.username = user.username;
		res.send({ isValidUser: true });
	}
});

const PostModel = require("./models/Post");
app.post("/api/add-post", upload.single("image"), async (req, res) => {
	console.log(req.body, req.file.path);
	if (!req.session.username) {
		res.send({ loggedIn: false });
		return;
	}
	const user = await UserModel.findOne({ username: req.session.username });
	const newPost = new PostModel({
		user,
		desc: req.body.desc,
		img_url: req.file.path,
		img_name: req.file.filename,
	});
	await newPost.save();
	user.posts.push(newPost);
	await user.save();
	res.send({ loggedIn: true, message: "Post added successfully" });
});

app.get("/api/check-login", async (req, res) => {
	if (!req.session.username) {
		res.send({ loggedIn: false });
	} else {
		const user = await UserModel.findOne({ username: req.session.username });
		console.log(user);
		res.send({ loggedIn: true, user });
	}
});

app.get("/api/home", async (req, res) => {
	const username = req.session.username;

	////To get all the posts irrespective of username
	// const posts = await PostModel.find({}).populate("user");

	//This is for profile page
	// const user = await UserModel.findOne({
	// 	username: req.session.username,
	// }).populate("posts");

	const user = await UserModel.findOne({ username }).populate({
		path: "friends",
		populate: { path: "posts" },
	});
	// user.friends.forEach((friend) => {
	// 	posts.push({userposts: (friend.posts)});
	// });
	res.send({ friends: user.friends });
});

app.post("/api/logout", (req, res) => {
	req.session.destroy();
	res.send("Logged Out");
});

const AfollowsB = async (usernameA, usernameB) => {
	const friendUser = await UserModel.findOne({ username: usernameB });
	await UserModel.updateOne(
		{ username: usernameA },
		{ $addToSet: { friends: friendUser } }
	);
};
// AfollowsB("tom", "jerry");
// AfollowsB("jerry", "tom");
app.post("/api/follow", async (req, res) => {
	if (!req.session.username) {
		res.send({ loggedIn: false });
		return;
	}
	const friendUsername = req.body.friendUserName;
	const myUsername = req.session.username;
	if (myUsername === friendUsername) {
		res.send("Same User Cannot follow");
		return;
	}
	// const friendUser = await UserModel.findOne({ username: friendUsername });
	// await UserModel.updateOne(
	// 	{ username: myUsername },
	// 	{ $addToSet: { friends: friendUser } }
	// );
	AfollowsB(myUsername, friendUsername);
	res.send("Followed");
});

app.post("/api/unfollow", async (req, res) => {
	if (!req.session.username) {
		res.send({ loggedIn: false });
		return;
	}
	const friendUsername = req.body.friendUserName;
	const myUsername = req.session.username;
	UserModel.findOne({ username: friendUsername }).then(async (res) => {
		UserModel.findOneAndUpdate(
			{ username: myUsername },
			{ $pull: { friends: res._id } },
			function (err, data) {
				console.log(err, data);
			}
		);
	});
	res.send("UnFollowed");
});

app.get("/api/profile", async (req, res) => {
	const username = req.session.username;
	if (!username) {
		res.send({ loggedIn: false });
		return;
	}
	const user = await UserModel.findOne({ username }).populate("posts");
	console.log(user);
	res.send({ user });
});

app.get("/api/users", async (req, res) => {
	const username = req.session.username;
	if (!username) {
		res.send({ loggedIn: false });
		return;
	}
	const users = await UserModel.find();
	const notFriends = [];
	const myUser = await UserModel.findOne({ username });
	users.forEach((user) => {
		if (user.username != username && !myUser.friends.includes(user._id)) {
			notFriends.push(user);
		}
	});

	res.send(notFriends);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Backend started and lisening on ${port}`);
});
