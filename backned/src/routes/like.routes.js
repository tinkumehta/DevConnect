import { Router } from "express";
import { toggleTweetLike } from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

 router.use(verifyJWT, upload.none())

 router.route("/toggle/t/:tweetId").post(toggleTweetLike);


 export default router;