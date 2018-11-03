'use strict';

// Dependencies
const mongoose = require('mongoose');
const conn = mongoose.connection;

// Log errors and stop application
conn.on('error', err => {
   console.error('Connection error:', err);
   process.exit(1);
});

// Success message when connected
conn.on('open', () =>{
   console.log('Connect to MongoDB in', conn.name);
});

// Disable autoindex for improve performance
const env = process.env.NODE_ENV || 'development';
if(env === 'test') {
  mongoose.connect(process.env.DB_URL_TEST, {useNewUrlParser: true, autoIndex: false});
}else{
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, autoIndex: false});
}

module.exports = conn;