const express = require('express');
const app = express();

const http = require('http');

const body_parser = require("body-parser");
app.use(body_parser.json());

const port = 3000;

// db setup
const db = require('./db');
const dbName = 'music_timeline';
const collectionName = 'step';

// db init
db.initialize(dbName, collectionName, function(dbCollection) { // success callback
  // get all items
  // dbCollection.find().toArray(function(err, result) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(result);
  // });

  // crud routes

  app.post('/step', (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => {
      if (error) throw error;
      dbCollection.find().toArray(function (_error, _result) {
        if (_error) throw _error;
        response.json(_result);
      });
    })
  });

  app.get('/steps', (request, response) => {
    dbCollection.find().toArray(function (_error, _result) {
      if (_error) throw _error;
      response.json(_result);
    });
  });

}, function (err) {  // failure callback
    throw err;
});
const server = http.createServer(app);

app.get('/', function(req, res) {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, function() {
  console.log('listening on *:3000');
});