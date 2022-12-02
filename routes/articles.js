const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const fs = require('fs')
const fsPromises = require('fs').promises;
const fileUpload = require("express-fileupload")
const app = express()

app.use(fileUpload());


router.get('/new', (req, res) => {

    res.render('articles/new', {article: new Article() })
})


router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', {article:article})
})


router.post('/', async (req, res) => {
    let imgbuffer = req.files.picture.data
    let imgb64 = imgbuffer.toString('base64');
    let article = new Article({
        title: req.body.title, // pulling the title element from req
        description: req.body.description, // pulling the description element from req
        picture: imgb64
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', {article:article})
    }

    
})

module.exports = router