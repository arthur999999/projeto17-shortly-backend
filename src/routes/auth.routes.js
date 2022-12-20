import { Router } from "express"
import { RegisterUser } from "../controllers/auth.controller.js"



const authRouter = Router()

authRouter.post('/signup', RegisterUser)


export default authRouter