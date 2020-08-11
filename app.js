const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
const router = require('./app/router');


app.use(express.urlencoded({
    extended: true
}));

app.use(router);




app.listen(port, () => console.log(`Server running at http://localhost:${port}`))