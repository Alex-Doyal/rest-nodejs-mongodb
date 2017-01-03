// store properties to be input to the app at runtime

var config = {};

config.mongodb = {};
config.server = {};

config.server.port = process.env.WEB_PORT || 3000;

//config.mongodb.username = process.env.MONGODB_USERNAME || 'alex';
//config.mongodb.password = process.env.MONGODB_PASSWORD || 'xxxx';
config.mongodb.host = process.env.MONGODB_HOST || 'localhost';
config.mongodb.port = process.env.MONGODB_PORT || 27017;
config.mongodb.databaseName = process.env.MONGODB_NAME || 'test';

module.exports = config;
