import userRepository from "../repositories/user.repository.js";

export async function tokenValidation (req, res, next) {

    const {authorization} = req.headers



    const token = authorization?.replace('Bearer ', '')

    if(!token){
        return res.sendStatus(401)
    }



    try {

        const session = await userRepository.getSession(token)

        if(!session.rows[0]){
            res.sendStatus(404)
            return
        }

        req.userId = session.rows[0].userId

    } catch (error) {
        
        res.status(400).send(error.message)
        return
    }

    next()


}