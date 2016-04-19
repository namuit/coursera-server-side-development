var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));

var dishRouter = require('./dishRouter');
app.use('/dishes',dishRouter);

var leaderRouter = require('./leaderRouter');
app.use('/leaders',leaderRouter);

var promoRouter = require('./promoRouter');
app.use('/promos',promoRouter);

module.exports = app;
