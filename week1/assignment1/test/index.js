'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('Correct dishes returned', function (t) {
  request(app)
    .get('/dishes')
    .expect('Content-Type', /text\/plain/)
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

test('Correct create new dish', function (t) {
  request(app)
    .post('/dishes')
    .expect('Content-Type', /text\/plain/)
    .expect(201)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

test('Correct delete all dishes', function (t) {
  request(app)
    .delete('/dishes')
    .expect('Content-Type', /text\/plain/)
    .expect(204)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});

test('Correct single dish returned', function (t) {
  var dishId = Math.floor((Math.random() * 10) + 1);
  request(app)
    .get('/dishes/'+ dishId)
    .expect('Content-Type', /text\/plain/)
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No error');
      t.end();
    });
});
