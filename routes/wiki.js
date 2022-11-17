let express = require('express')
let wikiRouter = express.Router();
let { addPage } = require('../views')

wikiRouter.get('/', (req, res, next) => {
    // res.redirect('/wiki')
})
// wikiRouter.post('/', (req, res) => {
//     res.send(
// })
wikiRouter.get('/add', (req, res) => {
    res.send(addPage())
})

module.exports = wikiRouter