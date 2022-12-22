import joi from "joi"
import { nanoid } from "nanoid"
import { connection } from "../database/db.js"
import userRepository from "../repositories/user.repository.js"

const urlSchema = joi.object({
    url: joi.string().required()
})


export async function ShortUrl (req, res) {

    const userId = req.userId

    const url = req.body

    const validation = urlSchema.validate(url, {abortEarly: false})

    if(validation.error){
        res.status(422).send(validation.error.message)
        return
    }

    const shortURL = nanoid(6)

    try {
        
        const userData = await userRepository.getUser(userId)

        await userRepository.createShorten(url.url, userData.rows[0].id, 0, shortURL)

        res.status(201).send({
            shortUrl: shortURL
        })

    } catch (error) {
        res.status(400).send(error.message)
    }

    
}