import  {Router} from 'express'
import {
     login, logout, register,
     getCurrentUser, followUser, 
     unfollowUser, searchUser,
     suggestionUser,
     getFollowersFollowing,
     } from '../controllers/user.controllers.js'
import {upload} from "../middlewares/multer.middlewares.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    register);

router.route("/login").post(login);

// secure routes
router.route("/logout").post( verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/follow/:id").post(verifyJWT, followUser);
router.route("/unfollow/:id").post(verifyJWT, unfollowUser);
router.route("/follows/:id").get(getFollowersFollowing);

router.route("/search").get(verifyJWT, searchUser);
router.route("/suggestions").get(verifyJWT, suggestionUser);



export default router;