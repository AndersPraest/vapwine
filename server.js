const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()
var path = require('path')
const fileUpload = require("express-fileupload")
const Article = require('./models/article')

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/reviews',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );


app.set('view engine', 'ejs')

app.use(fileUpload());

app.use(express.urlencoded({  extended: false  }))
app.use('/articles' , articleRouter)


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('index', {articles: articles})
})

