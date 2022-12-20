import { Router } from "express"
import { LoginUser, RegisterUser } from "../controllers/auth.controller.js"



const authRouter = Router()

authRouter.post('/signup', RegisterUser)
authRouter.post('/signin', LoginUser)


export default authRouter