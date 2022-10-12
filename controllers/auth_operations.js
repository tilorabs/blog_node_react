//https://www.bezkoder.com/node-js-jwt-authentication-mysql/
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken
const bcrypt = require('bcrypt'); //npm install bcrypt
const { insertUser, getUserByName } = require('./pg_operations');
const dotenv = require('dotenv'); //für .env file
dotenv.config();

async function registerUser({username, password}) {
    const user = await getUserByName(username);
    if(user.length === 0) {
        const pwHash = bcrypt.hashSync(password, 10);
        const newUser = await insertUser(username, pwHash);
        return newUser;
    }
    return null;
}

function generateAccessToken(username) {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

async function validateUser ({username, password}) {
    const users = await getUserByName(username);
    if(users.length === 0) {
        return null;
    }
    let isValid = false;
    try {
        const user = users[0];
        isValid = await bcrypt.compare(password, user.password);
        
    } catch(error) {
        return null;
    }
    if(!isValid) {
        return null;
    }
    return {token: generateAccessToken(username)};
}

//only for backend testing, used as Middleware function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        token = req.cookies.access_token?.token; //? = wenn access_token exist, hole access_token.token
    }

    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);  
      if (err)
        return res.sendStatus(403);
      req.user = user;
      next();
    })
}

module.exports = {registerUser, validateUser, authenticateToken};