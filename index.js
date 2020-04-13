const express = require('express');
 
const app = new express();

const path = require('path');
//const { engine } = require('express-edge');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  const Post = require('./database/models/Post');

mongoose.connect('mongodb+srv://subhajit:subhajit1234@cluster0-nk2jp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));



//app.use(engine);
///app.set('views', `${__dirname}/views`);
app.use(expressEdge.engine);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));



 
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});
//posts/new
app.get('/postsa', (req, res) => {
    res.render('create')
});
//posts/store
app.post('/postsb', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
});

app.get('/post:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})


app.listen(4000, () => {
    console.log('App listening on port 4000')
});