const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const fs = require('fs')
const fsPromises = require('fs').promises;

async function readCsv(image) {
    // The content will be available after finished reading
    const content = await fsPromises.readFile(image);
    // By default, the content return as Buffer here
    return content;
  }

router.get('/new', (req, res) => {

    res.render('articles/new', {article: new Article() })
})


router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', {article:article})
})


router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title, // pulling the title element from req
        description: req.body.description, // pulling the description element from req
        image: fs.readFile(req.body.picture, function(err, data) { // attempting to pull image file from "image" element from _form_fields.ejs and read eiter binary or dataUrl
            if (err) throw err
              return data // this solution is trying to path to a local file with the .jpg of the image i upload
          })
    })

    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', {article:article})
    }

    
})

module.exports = router