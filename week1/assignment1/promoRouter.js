"use strict";

var express = require('express');
var bodyParser = require("body-parser");

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all(function(req,res,next) {
  res.header("X-COUSERA", "assignment-1")
  next();
})

.get(function(req,res,next){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Will send all the promos to you!');
})

.post(function(req, res, next){
  res.writeHead(201, { 'Content-Type': 'text/plain' });
  res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
  res.writeHead(204, { 'Content-Type': 'text/plain' });
  res.end('Deleting all promos');
});

promoRouter.route('/:promoId')
.all(function(req,res,next) {
  res.header("X-COUSERA", "assignment-1")
  next();
})

.get(function(req,res,next){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Will send details of the promo: ' + req.params.promoId +' to you!');
})

.put(function(req, res, next){
  var content_type = req.headers['content-type'];
  if (!content_type || content_type.indexOf('application/json') !== 0) {
    return res.send(400);
  }
  if((typeof req.body.name == 'undefined') || (typeof req.body.description == 'undefined')) {
    res.send(400);
  } else {
    res.writeHead(202, { 'Content-Type': 'text/plain' });
    res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name + ' with details: ' + req.body.description);
  }
})

.delete(function(req, res, next){
  res.writeHead(204, { 'Content-Type': 'text/plain' });
  res.end('Deleting promo: ' + req.params.dishId);
});

module.exports = promoRouter;
