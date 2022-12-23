import { Router } from "express"
import { deleteLink, getRanking, getUrl, getUserData, openLink, ShortUrl } from "../controllers/user.controller.js"
import { tokenValidation } from "../middleware/tokenValidation.middleware.js"




const userRouter = Router()

userRouter.post('/urls/shorten', tokenValidation, ShortUrl)
userRouter.get('/urls/:id', getUrl)
userRouter.get('/urls/open/:shortUrl', openLink)
userRouter.delete('/urls/:id', tokenValidation, deleteLink )
userRouter.get('/users/me', tokenValidation, getUserData)
userRouter.get('/ranking', getRanking)


export default userRouter