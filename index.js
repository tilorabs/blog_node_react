const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
//app.use(middleware) is called every time a request is sent to the server. extends request with functionality
//Each request in app goes through multiple middleware’s in express. If one of the middleware returns the response it ends there. 
//If any middleware wants to pass the request to next middleware, it uses next() function call at the end of its function call.
app.use(express.static('build'));
app.use(cors({ credentials: true }));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); //// parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser());
//const blogs = require('./models/blogs'); //mock objects
//const categories = require('./models/categories'); //mock objects
const { getBlogs, postBlog, getCategories } = require('./controllers/pg_operations');
const { registerUser, validateUser, authenticateToken } = require('./controllers/auth_operations');

const port = process.env.PORT || 8080;

app.get('/blogs', (req, res) => {
    //res.send(blogs); //for mock objects
    getBlogs()
    .then((data) => {res.json(data)})
    .catch((err) => {
        res.status(400).send({error: err.message})
    })
})

app.get('/categories', (req, res) => {
    //res.send(categories); //for mock objects
    getCategories()
    .then((data) => {res.json(data)})
    .catch((err) => {
        res.status(400).send({error: err.message})
    })
})

//todo: authenticateToken is ignored until expired
app.post('/blog', authenticateToken, (req, res) => {
    postBlog(req)
    .then((data) => {res.status(201).send(data)})
    .catch((err) => {
        res.status(400).send({error: err.message})
    })
});

app.post('/login', async (req, res) => {
    const result = await validateUser(req.body);
    if(!result) {
        res.status(400).send({error: 'Login failed'});
    } else {
        res.cookie('access_token', result, {httpOnly:true, secure: false});
        res.status(201).send(result);
    }
});

app.post('/logout', async (req, res) => {
    const result = res.clearCookie('access_token');
    if(!result) {
        res.status(400).send({error: 'Logout failed'});
    } else {
        res.status(201).send({status: 'Logout successful'});
    }
});

app.post('/register', async (req, res) => {
    const result = await registerUser(req.body);
    if(!result) {
        res.status(400).send({error: 'User already exists'});
    } else {
        res.send(result);
    }
});

app.listen(port, () => console.log('Server listening at ' + port));