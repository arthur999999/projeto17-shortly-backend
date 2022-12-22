import { Router } from "express"
import { ShortUrl } from "../controllers/user.controller.js"
import { tokenValidation } from "../middleware/tokenValidation.middleware.js"




const userRouter = Router()

userRouter.post('/urls/shorten', tokenValidation, ShortUrl)


export default userRouter