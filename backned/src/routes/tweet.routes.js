import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { createTweet, deleteTweet, getAllTweets, getUserTweet, updatedTweet } from "../controllers/tweet.controllers.js"

 const router = Router();

 router.use(verifyJWT, upload.none());

 router.route("/").post(createTweet);
 router.route("/:tweetId").patch(updatedTweet).delete(deleteTweet);
 router.route("/user/:userId").get(getUserTweet);
 router.route("/all").get(getAllTweets)

 export default router;