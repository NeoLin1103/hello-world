const mongoose = require('mongoose');
const Comment = require('./models/comments.js');
const uuid = require('uuid');

const mongoDB = 'mongodb://localhost:8080/commentBoard';
mongoose.connect(mongoDB)
    .then(() => {
        console.log('Successful connection');
    })
    .catch((err) => {
        console.log('Failed connection');
        console.log(err);
    });

const seedComments = [
    {
        name: 'Neo',
        text: 'Hello',
        id: uuid.v4()
    },
    {
        name: 'Terry',
        text: 'Hi',
        id: uuid.v4()
    },
    {
        name: 'Peter',
        text: '你好',
        id: uuid.v4()
    }
];

Comment.insertMany(seedComments)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });