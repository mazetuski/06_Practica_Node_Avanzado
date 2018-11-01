'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const upload = require('../../lib/uploadConfig');
const Advertisement = require('../../models/Advertisement');
const createError = require('http-errors');
const jwtAuth = require('../../lib/jwtAuth');
const cote = require('cote');
const requester = new cote.Requester({name: 'Thumbnail client'});

// middleware for get photo image and form data
router.use(upload.single('photo'));

// middleware for auth all petitions on this api
router.use(jwtAuth());

/**
 * GET /
 * Get all advertisements
 */
router.get('/', async (req, res, next) => {
    try {
        // get advertisements
        const advertisements = await Advertisement.list(req);
        // send data success
        res.json({success: true, data: advertisements});
    } catch (err) {
        return next(err);
    }
});

/**
 * GET /:id
 * Get one advertisement by id
 */
router.get('/:id', async (req, res, next) => {
    try {
        // find advertisement by id
        const advertisement = await Advertisement.findById(req.params.id).exec();
        // check errors
        if (!advertisement) {
            return next(createError(404));
        }
        res.json({success: true, data: advertisement});
    } catch (err) {
        return next(err);
    }
});

/**
 * POST /
 * Create one advertisement
 */
router.post('/', async (req, res, next) => {
  try {
    const photo = req.file;
    if (!photo) {
      return next('Advertisement validation failed: photo: Path `photo` is required.');
    }
    const data = req.body;
    data.photo = photo.filename;

    requester.send({
      type: 'thumbnail',
      image: photo.filename,
      sizeX: 100,
      sizeY: 100
    }, async result => {
      const response = await result;
      if(!response){
        return res.json({ success: false, error: 'Error on thumbnail' })
      }
      data.thumbnail = response;
      // Create advertisement with post params
      const advertisement = new Advertisement(data);
      // save on database
      const adResponse = await advertisement.save();
      // return data
      res.json({success: true, data: adResponse});
    });
  } catch (err) {
    next(err);
  }
});

// export router
module.exports = router;