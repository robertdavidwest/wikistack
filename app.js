const express = require('express')
const morgan = require('morgan')
const { db } = require('./models')
const app = express();
const layout = require('./views/layout')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send(layout(''));
})

const port = 1337;
app.listen(port, () => {
    console.log("App listening")
})

db.authenticate() 
  .then(() => { 
    console.log('connected to the database'); 
})