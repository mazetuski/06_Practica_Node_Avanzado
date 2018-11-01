'use strict';

// Dependencies
const mongoose = require('mongoose');
const apiHelper = require('../lib/apiHelper');

// Default values
const limitDefault = 20;

// Create schema
const advertisementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sale: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    enum: ['work', 'lifestyle', 'motor', 'mobile']
  }
});

// Create indexes
advertisementSchema.index({name: 1, sale: 1});

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

/**
 * Function for get all distinct tags
 * @returns {Promise<Array>}
 */
advertisementSchema.statics.getTags = async () => {
  let resultTags = [];
  // create query with filter
  const query = Advertisement.find()
      .select('tags -_id');
  // Get object tags
  const tags = await query.exec();
  // Loop all tags for get distinct
  tags.forEach(tagObj => {
    // loop tags array
    tagObj.tags.forEach(tag => {
      // check if exists
      if (resultTags.find(elem => elem === tag)) {
        return;
      }
      // if not add it
      resultTags = [...resultTags, tag];
    });
  });

  return resultTags;
};

/**
 * Function for get String from sale variable
 * @returns {string}
 */
advertisementSchema.methods.getSaleString = function () {
  return this.sale ? "En Venta" : "Se Busca";
};

// Create model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Export model
module.exports = Advertisement;