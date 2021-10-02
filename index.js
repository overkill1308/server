const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config')

app.use(bodyParser.json());

const postRoutes = require('./routes/posts');

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('mongodb is connected!');
});

const port = process.env.PORT || 3107

app.listen(port, () => {
    console.log('server connected!');
});