import joi from "joi"

import { connection } from "../database/db.js"


export async function RegisterUser(req, res) {

try {
    const {rows} = await connection.query('SELECT * FROM users;')
    res.send(rows)
} catch (error) {
    res.status(400).send(error.message)
}

}