'use strict';

const express = require('express');
const scoreRouter = express.Router();
const uuid = require ('uuid/v1');

let score = [
  // {_id:uuid(), name: 'string', score:'number'},
  {score: '10', name: 'corey', _id:uuid()},
  {score: '20', name: 'gwen', _id:uuid()},
  {score: '30', name: 'chloe', _id:uuid()},
  {score: '40', name: 'caleb', _id:uuid()},
];

scoreRouter.get('/score', (request, response, next) => {
  response.status(200).json(score);
});

scoreRouter.post('/score', (request, response) => {
  response.status(200).json(score);
});

scoreRouter.delete('/score/:id', (request, response) => {
  score = score.filter(scores => scores._id !== request.params.id);

  response.status(200).json(score);
});


module.exports = scoreRouter;