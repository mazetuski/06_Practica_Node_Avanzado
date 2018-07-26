// Dependencies
const mongoose = require('mongoose');

// Create schema
const advertisementSchema = mongoose.Schema({
   name: String,
   sale: Boolean,
   price: Number,
   photo: String,
   tags: [String]
});

// Create model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Export model
module.exports = Advertisement;