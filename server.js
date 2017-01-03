
// imports express modules and creates Express application
const express = require('express');
const app = express();

// parses incoming requests
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// mongodb requirements
const mongodb = require('./mongodb.js');
const config = require('./config.js');
var db

// connect to db
mongodb.connectToServer( function( err ) {
  app.listen(config.server.port, function() {
     console.log('Node server listening on ' + config.server.port);
     db = mongodb.getDb();
  })
});


// listen for connections on port 9999
app.listen(9999, function() {
  console.log('Node server listening on 9999')
})

// serve static content from the "public" directory within the app directory
app.use(express.static(__dirname + '/public'));

// create employees
app.post('/employee/create', (req, res) => {
  db.collection('employees').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send('Employee created!');
  })
})

// delete employees
app.delete('/employee/delete', (req, res) => {
  db.collection('employees').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('Employee deleted!\n')
  })
})

// retrieve employees
app.get('/employee/get', function(req, res){
  db.collection('employees').find().toArray(function(err, results) {
  res.send(results);
  })
  res.set({
    'Cache-Control': 'no-cache'
  });
});
