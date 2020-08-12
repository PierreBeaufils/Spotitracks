const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');

const session = require('express-session');

const user = require('./app/middlewares/user');

app.use(express.static(__dirname + '/public'));
const router = require('./app/router');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(user);

app.use(express.urlencoded({
    extended: true
}));

app.use(router);


app.listen(PORT);