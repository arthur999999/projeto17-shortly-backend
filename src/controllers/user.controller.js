import joi from "joi"
import { nanoid } from "nanoid"
import userRepository from "../repositories/user.repository.js"

const urlSchema = joi.object({
    url: joi.string().uri().required()
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

export async function getUrl(req, res) {

    const id = req.params.id

    try {

        const urlShort = await userRepository.getUrlId(id)

        if(!urlShort.rows[0]){
            res.sendStatus(404)
            return
        }

        const objectUrl = {
            id: id,
            shortUrl: urlShort.rows[0].shorten,
            url: urlShort.rows[0].url
        }

        res.status(200).send(objectUrl)

    } catch (error) {
        res.status(400).send(error.message)
    }

}

export async function openLink (req, res){

    const shortURL = req.params.shortUrl

    try {
        const link = await userRepository.getUrlShort(shortURL)

        if(!link.rows[0]){
            res.sendStatus(404)
            return
        }

        const count = link.rows[0].views + 1

        await userRepository.updateViews(count, shortURL)

        res.redirect(link.rows[0].url)

    } catch (error) {
        res.status(400).send(error.message)
    }

}

export async function deleteLink(req, res) {
    const id = req.params.id

    const userId = req.userId

    try {

        const url = await userRepository.getUrlId(id)

        if(!url.rows[0]){
            res.sendStatus(404)
            return
        }

        if(url.rows[0].userId != userId){
            res.sendStatus(401)
            return
        }

        await userRepository.deleteUrl(id)

        res.sendStatus(204)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function getUserData (req, res){
    const userId = req.userId

    try {
        
        const userData = await userRepository.getUserData(userId)

        if(!userData.rows[0]){
            res.sendStatus(404)
            return
        }

        const links = await userRepository.getUrlUser(userId)

        const object = {
            id: userData.rows[0].id,
            name: userData.rows[0].name,
            visitCount: userData.rows[0].visitCount,
            shortenedUrls: links.rows
        }

        res.status(200).send(object)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function getRanking (req, res) {

    try {
        const {rows} = await userRepository.getRanking()

        rows.forEach((m)=> {if(m.visitCount == null){
            m.visitCount = 0
        }})

        res.status(200).send(rows)

    } catch (error) {
        res.status(400).send(error.message)
    }
}   