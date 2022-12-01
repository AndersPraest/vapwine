const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()
var path = require('path')
const fileUpload = require("express-fileupload")

mongoose.connect('mongodb://localhost/reviews')


app.set('view engine', 'ejs')

app.use(fileUpload());

app.use(express.urlencoded({  extended: false  }))
app.use('/articles' , articleRouter)


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
    const articles = [{
        title: "2019 Apothic Cab",
        createdAt: new Date(),
        description: 'Big presence of a classic Cab with a silky touch. Signature layers of blackberry compote and black currant wrap around hints of mocha and vanilla. Blending the wine with Zinfandel delivers the complexity of Cabernet with billowy tannins that glide across the palate, smooth as silk.',
        image: 'https://www.oakandbarrelnyc.com/wp-content/uploads/2015/02/APOTHIC-RED-750ML.jpg'
    },
    {
        title: "Roscato Rosso Dolce",
        createdAt: new Date(),
        description: 'Delicately sweet, gently fizzy red wine from the northern Italian region of Lombardy. Makes a wonderful aperitif and is also incredibly food-friendly.',
        image: 'https://cdn.shoplightspeed.com/shops/623432/files/15817905/450x800x1/roscato-roscato-rosso-dolce-nv-750ml.jpg'
    }]
    res.render('index', {articles: articles})
})

app.listen(5000)