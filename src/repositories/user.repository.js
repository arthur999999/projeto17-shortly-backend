
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

async function deleteUrl(id){
    return connection.query(`DELETE FROM links WHERE id = $1;`, [id])
}

async function getUserData(id) {
    return connection.query(`SELECT users.id, users.name, SUM(links.views) as "visitCount" FROM users JOIN links ON users.id = links."userId" WHERE users.id = $1 GROUP BY users.id;`, [id])
}

async function getUrlUser(id) {
    return connection.query(`SELECT links.id, links.shorten as "shortUrl", links.url, links.views as "visitCount" FROM links WHERE links."userId" = $1;`, [id])
}

async function getRanking () {
    return connection.query(`SELECT users.id, users.name, COUNT(links.id) as "linksCount", SUM(links.views) as "visitCount" FROM users LEFT JOIN links ON users.id = links."userId" GROUP BY users.id ORDER BY "visitCount" DESC NULLS LAST LIMIT 10;
    `)
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
    updateViews,
    deleteUrl,
    getUserData,
    getUrlUser,
    getRanking

}

export default userRepository