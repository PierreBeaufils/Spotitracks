const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile('/public/html/test.html', {
        root: __dirname
    });
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))