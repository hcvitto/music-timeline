const express = require('express');
const app = express();
mongo = require('mongodb');

const http = require('http');

const body_parser = require("body-parser");
app.use(body_parser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 3000;

// db setup
const db = require('./db');
const dbName = 'music_timeline';
const collectionName = 'step';

// db init
db.initialize(dbName, collectionName, function(dbCollection) { // success callback

  // crud routes

  // post a new item
  // return the new added document
  app.post('/step', (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => {
      if (error) throw error;
      dbCollection.findOne({ "_id": result.insertedId}, (_error, _result) => {
        if (_error) throw _error;
        response.json(_result);
      });
    })
  });

  // get all items
  // return all collection documents
  app.get('/steps', (request, response) => {
    dbCollection.find().toArray(function (_error, _result) {
      if (_error) throw _error;
      response.json(_result);
    });
  });

  // delete an item
  // return an objecet with a boolean to aknowledge deletion
  app.delete('/step/:id', function(request, response) {
    const query = { "_id": new mongo.ObjectId(request.params.id) };
    dbCollection.deleteOne(query, function(error, result) {
      if (error) throw _error;
      const res = { message: result.result.ok && result.result.n === 1 };
      response.json(res);
    });
  });

  // update an item
  // return ***
  app.put('/step', (request, response) => {
    console.log('_______put request', request.body);
    const query = { "_id": new mongo.ObjectId(request.body.id) };
    const data = request.body;
    dbCollection.findOneAndUpdate(
      query,
      {
        $set: {
          title: request.body.title
        }
      },
      {},
      (error, result) => {
        if (error) throw error;
        console.log('_______put request', result);
        response.json(result);
        // dbCollection.findOne({ id: result }, (_error, _result) => {
        //   if (_error) throw _error;
        //   response.json(_result);
        // });
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