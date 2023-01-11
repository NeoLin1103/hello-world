const express = require('express');
let engine = require('ejs-locals');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comments.js');
const uuid = require('uuid');

const mongoDB = 'mongodb://mongo:27017/commentBoard';
mongoose.connect(mongoDB)
    .then(() => {
        console.log('Successful connection');
    })
    .catch((err) => {
        console.log('Failed connection');
        console.log(err);
    });

app = express();
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
// 使用'body-parser'套件處理form資料
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/home', (req,res) => {
    res.render('home');
})

// 主頁
app.get('/comments', async (req,res) => {
    commentsArray = [];
    const comments = await Comment.find({});
    comments.forEach(element => {
        commentsArray.push({name: element.name, text: element.text, id: element.id});
    });
    res.render('comments', {commentsArray});
})

// 個別資訊頁
app.get('/comments/:id', async (req,res) => {
    const commentId = req.params.id;
    const theComment = await Comment.findOne({id: commentId});
    const name = theComment.name;
    const text = theComment.text;
    console.log({name: name, text: text, id: commentId});
    res.render('comment', {name, text, commentId});
})

// 新增留言頁面
app.get('/new', (req,res) => {
    res.render('newComment');
})

// 新增留言api
app.post('/createNewComment', async(req,res) => {
    console.log(req.body.name);
    console.log(req.body.comment);
    await Comment.create({name:req.body.name,text:req.body.comment,id:uuid.v4()});
    res.redirect('/comments');
})

// 更新留言頁面
app.get('/updateComment/:id', async (req,res) => {
    const commentId = req.params.id;
    const theComment = await Comment.findOne({id: commentId});
    const name = theComment.name;
    const text = theComment.text;
    console.log({name: name, text: text, id: commentId});
    res.render('updateComment', {name, text, commentId});
})

// 更新留言api
app.post('/updateComment/:id', async (req,res) => {
    console.log(req.body.name);
    console.log(req.body.comment);
    const commentId = req.params.id;
    await Comment.updateOne({id:commentId},{name:req.body.name,text:req.body.comment});
    res.redirect('/comments');
})

// 刪除留言api
app.post('/comments/delete/:id', async (req,res) => {
    // 從個別資訊頁取得id
    const commentId = req.params.id;
    console.log(commentId);
    await Comment.deleteOne({id:commentId});
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log('Port initiated successfully.')
});