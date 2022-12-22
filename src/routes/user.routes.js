import { Router } from "express"
import { getUrl, ShortUrl } from "../controllers/user.controller.js"
import { tokenValidation } from "../middleware/tokenValidation.middleware.js"




const userRouter = Router()

userRouter.post('/urls/shorten', tokenValidation, ShortUrl)
userRouter.get('/urls/:id', getUrl)


export default userRouter