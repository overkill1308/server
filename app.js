const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config')

app.use(bodyParser.json());
app.use(cors())

const postRoutes = require('./routes/posts');

app.use('/', postRoutes);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('mongodb is connected!');
});

const port = process.env.PORT || 3107

app.listen(port, () => {
    console.log('server connected!');
});