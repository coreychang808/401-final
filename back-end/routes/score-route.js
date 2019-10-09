'use strict';

const express = require('express');
const scoreRouter = express.Router();
const uuid = require ('uuid/v1');

let score = [
  // {_id:uuid(), name: 'string', score:'number'},
  {score: 10, name: 'corey', _id:uuid()},
  {score: 20, name: 'gwen', _id:uuid()},
  {score: 30, name: 'chloe', _id:uuid()},
  {score: 40, name: 'caleb', _id:uuid()},
];

scoreRouter.get('/score', (request, response, next) => {
  score = score.sort((a,b) => {
    let first = a.score;
    let second = b.score;

    if(first > second){
      return -1;
    }
    if(second > first){
      return 1;
    }
    else{
      return 0;
    }
  })
  response.status(200).json(score);
});

scoreRouter.post('/score', (request, response) => {
  let newScore = request.body;
  newScore.score = parseInt(newScore.score);
  newScore._id = uuid();
  score.push(newScore);
  response.status(200).json(score);
});

scoreRouter.delete('/score', (request, response) => {
  score = score.filter(scores => scores._id !== request.body.id);

  response.status(200).json(score);
});

scoreRouter.get('/scores-bigger-than/:value', (request, response) =>{
  score = score.filter(scores => scores.score > request.params.value)
  response.status(200).json(score);
})


module.exports = scoreRouter;