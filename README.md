## Deployed Application Link -

### [https://post-it-4802.herokuapp.com/](https://post-it-4802.herokuapp.com/)

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
`/api/follow` -> Takes in a username as input and adds it to the freinds list of logged in user\
`/api/unfollow` -> Takes in a username as input and removes it from the freinds list of logged in user (if exists)\
`/api/logout` -> Logs out the current user
