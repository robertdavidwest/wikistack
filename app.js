const express = require('express')
const morgan = require('morgan')
const { db, Page, User } = require('./models')
const app = express();
const layout = require('./views/layout')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send(layout(''));
})

const port = 1337;

const init = async() => {
    await db.sync({force: true})
    
    app.listen(port, () => {
      console.log("App listening");
    });
};

init()

db.authenticate() 
  .then(() => { 
    console.log('connected to the database'); 
})
