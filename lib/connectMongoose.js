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
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, autoIndex: false });

module.exports = conn;