
import { connection } from "../database/db.js"

async function getUser(id) {
	return connection.query('SELECT * FROM users WHERE id=$1;', [id]);
}

async function getEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1;`, [ email])
}

async function createUser(name, email, password){
    return connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])
}

async function createSessions(id, token){
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [id, token])
}

async function createShorten(url, userId, views, shorten){
    return connection.query(`INSERT INTO links (url, "userId", views, shorten) VALUES ($1, $2, $3, $4);`, [url, userId, views, shorten])
}

async function getSession(token){
    return connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
}

async function getUrlId(id){
    return connection.query(`SELECT * FROM links WHERE id = $1;`, [id])
}

async function getUrlShort(short){
    return connection.query(`SELECT * FROM links WHERE shorten = $1;`, [short])
}

async function updateViews(num, shorten){
    return connection.query(`UPDATE links SET views = $1 WHERE shorten = $2;`, [num, shorten])
}

const userRepository = {
	getUser,
    getEmail,
    createUser,
    createSessions,
    getSession,
    createShorten,
    getUrlId,
    getUrlShort,
    updateViews
}

export default userRepository