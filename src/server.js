import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(userRouter)

const port = process.env.PORT || 5000

app.listen(port, ()=> {console.log('rodando')})

