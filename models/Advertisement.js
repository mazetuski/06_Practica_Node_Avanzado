'use strict';

// Dependencies
const mongoose = require('mongoose');
const apiHelper = require('../lib/apiHelper');

// Default values
const limitDefault = 20;

// Create schema
const advertisementSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

/**
 * Static function for find Advertisements with filters by request
 * @param req
 * @returns {Promise}
 */
advertisementSchema.statics.list = (req) => {
    // get filter form request
    const filter = apiHelper.getFilterForSchema(advertisementSchema.paths, req);
    // create query with filter
    const query = Advertisement.find(filter);

    // get all possible params for query
    const limit = parseInt(req.query.limit) || limitDefault;
    const skip = parseInt(req.query.skip) || undefined;
    const fields = req.query.fields;
    const sort = req.query.sort;

    // add all params to the query
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);

    // exec query and return value
    return query.exec();
};


// Create model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Export model
module.exports = Advertisement;