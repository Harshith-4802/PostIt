## Deployed Application Link -

### [https://post-it-4802.herokuapp.com/](https://post-it-4802.herokuapp.com/)

## Demo -

https://user-images.githubusercontent.com/111749559/199515315-d50ea082-2349-4632-aac6-9036f3d526c2.mp4

## App is made responsive, works on mobile device also - 

https://user-images.githubusercontent.com/111749559/199595005-42bbcac6-e70a-4aac-90b1-5fba1af1320d.mp4

## To run locally

In the project directory, you can run:

### For Starting the Backend :

`node server.js`

### For Staring Frontend :

`cd client`

`npm start`

​
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

## Backend Rest APIs

### Get Requests

`/api/check-login` -> returns true if there is a user logged in\
`/api/home` -> returns all the freinds for the current user\
`/api/users` -> returns all the users excluding current user

### Post Requests

`/api/sign-up` -> Takes user info as input, creates a new User and stores in database (password is hashed and stored)\
`/api/login` -> Takes username and password, check if they match with any user in the database\
`/api/add-post` -> Takes post info (image and description) and stores in database mapped with logged in user\
`/api/follow` -> Takes in a username as input and adds it to the friends list of logged in user\
`/api/unfollow` -> Takes in a username as input and removes it from the friends list of logged in user (if exists)\
`/api/like` -> Takes in a postId as input and adds the loggedIn user to the likes list of post\
`/api/dislike` -> Takes in a postId as input and removes the loggedIn user from the likes list of post (if exists)\
`/api/logout` -> Logs out the current user
