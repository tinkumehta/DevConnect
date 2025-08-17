import  {Router} from 'express'
import { login, logout, register } from '../controllers/user.controllers.js'
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
router.route("/logout").post( verifyJWT, logout);


export default router;