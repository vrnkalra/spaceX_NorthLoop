var express = require('express');
var logger = require('morgan');

var spaceXRouter = require('./routes/spacex');

var app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', spaceXRouter);

module.exports = app;