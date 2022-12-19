import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)

app.listen(process.env.PORT, ()=> {console.log('rodando')})
