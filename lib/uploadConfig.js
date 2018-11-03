'use strict';

// Dependencies
const multer = require('multer');
const path = require('path');

// upload config
const storage = multer.diskStorage({
  /**
   * Destination of the file in public/images
   * @param req
   * @param file
   * @param cb
   */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'images'))
  },
  /**
   * Name of the file
   * @param req
   * @param file
   * @param cb
   */
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({storage: storage});