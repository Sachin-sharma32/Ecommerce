const express = require("express");
const {
    createUser,
    logIn,
    logOut,
    refresh,
} = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(logIn);
router.route("/logout").post(logOut);
router.route("/refresh").get(refresh);

module.exports = router;

//? 1 - auth
//* access token valid for short time ( few minutes )
//* refresh token valid for days
//* don't store these in local storage or cookie coz hacker can access them via javascript
//* if storing then send them as "httpOnly cookie" which are not accessable in client side
//* access and refresh token provides after login to access resouces
//* after it expires client sends refresh token to get new access token

//? 2 - why use jwt
//* use for authorisation
//* in session authentication user is sent a session Id during login and this session is stored on "server"
//* so that everytime user makes request it can be identified
//* jwt don't store jwt token on the server, it just store a single secret key for all users
//* but jwt is less secure coz it is stored on client, session is stored on server
//* we cannot use user details for authorization stored in local storage coz it can easily be manipulated by anyone by changing the details in local storage itself

//? 3 - refresh token
//* access token is send to server for authorization
//* a hacker can intercepts the request and able to decode the jwt
//* so keep the access token valid for very less time
//* and generate a new one using refresh token which is stored for a long duration on user browser
//* it is not sent for authorization so it can't be intercepted
//* we can store refresh token in local storage coz react takes care of xss attack on web storages (local and session storage)
