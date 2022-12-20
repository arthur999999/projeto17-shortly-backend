import joi from "joi"

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

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [register.name, register.email, register.password])

        res.sendStatus(201)

    } catch (error) {
        res.status(400).send(error.message)
    }

}