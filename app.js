const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/practice')
    .then(() => {
        console.log('Connection successful')
    })
    .catch((err) => {
        console.log('Connection unsuccessful', err)
    });

app.use('/', routes);

app.listen(4000, () => {
    console.log('App listening on port 4000');
})