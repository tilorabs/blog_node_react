const dotenv = require('dotenv'); //für .env file
dotenv.config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: true,
    ssl: { rejectUnauthorized: false },
})

async function getBlogs() {
    return pool.query(`SELECT id, title, date_time, author_name, content_text, picture, special, category_id FROM blog`)
    .then((data) => {
        return data.rows;
    })
}

async function getCategories() {
    return pool.query(`SELECT id, name FROM category`)
    .then((data) => {
        return data.rows;
    })
}

async function postBlog(data) {
    return pool.query(`INSERT INTO blog (title, date_time, author_name, content_text, picture, special, category_id) values ($1, $2, $3, $4, $5, $6, $7) returning *;`,
        [data.body.title, data.body.date_time, data.body.author_name, data.body.content_text, data.body.picture, data.body.special, data.body.category_id]
    )
    .then((data) => {
        return data.rows;
    })
}

async function insertUser(username, pwHash) {
    return pool.query(`INSERT INTO users (username, password) values ($1, $2) returning *;`, [username, pwHash])
    .then((data) => {
        return data.rows;
    })
}

async function getUserByName(username) {
    return pool.query(`SELECT id, username, password FROM users WHERE username = $1`, [username])
    .then((data) => {
        return data.rows;
    })
}

module.exports = {getBlogs, postBlog, getCategories, insertUser, getUserByName};