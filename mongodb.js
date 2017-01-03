//define the MongoClient
var MongoClient = require( 'mongodb' ).MongoClient;
var util = require('util');
var config = require('./config');
var _db;

// database connection parameters
var uri = util.format('mongodb://%s:%d/%s',
    config.mongodb.host,
    config.mongodb.port, config.mongodb.databaseName);

// connect to the mongo database
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( uri, { auto_reconnect: true }, function( err, db ) {
      if (err) throw err;
      else if (!db)  console.log('Unknown error connecting to database');
      else {
        console.log('Connected to MongoDB database server at:');
        console.log('\n\t%s\n', uri);
        _db = db;
      }
      return callback( err );
    } );
  }, 
  getDb: function() {
    return _db;
  }
};
