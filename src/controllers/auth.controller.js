import joi from "joi"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'
import { connection } from "../database/db.js"

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()

})


export async function RegisterUser(req, res) {

    const register = req.body

    const validation = registerSchema.validate(register, {abortEarly: false})

    if(validation.error){
        res.status(422).send(validation.error.message)
        return
    }

    if(register.password !== register.confirmPassword){
        res.status(422).send('confirme sua senha!')
        return
    }

    try {
        const sameEmail = await connection.query(`SELECT * FROM users WHERE email = $1`, [register.email])

        if(sameEmail.rows[0]){
            res.sendStatus(409)
            return
        }

        const passwordEncrypt = bcrypt.hashSync(register.password, 10)

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [register.name, register.email, passwordEncrypt])

        res.sendStatus(201)

    } catch (error) {
        res.status(400).send(error.message)
    }

}

const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

export async function LoginUser(req, res) {

    const login = req.body

    const validation = loginSchema.validate(login, {abortEarly: false})

    if(validation.error){
        res.status(422).send(validation.error.message)
        return
    }

    try {
        const emailExist = await connection.query(`SELECT * FROM users WHERE email = $1`, [login.email])

        if(!emailExist.rows[0]){
            res.sendStatus(401)
            return
        }

        if(bcrypt.compareSync(login.password, emailExist.rows[0].password)){
            const token = uuid()

            await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [emailExist.rows[0].id, token])

            res.status(200).send(token)

            return
        }

        res.sendStatus(401)
    } catch (error) {
        res.status(400).send(error.message)
    }

    

}