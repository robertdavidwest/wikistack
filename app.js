const express = require('express')
const morgan = require('morgan')
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

const port = 1337;
app.listen(port, () => {
    console.log("App listening")
})