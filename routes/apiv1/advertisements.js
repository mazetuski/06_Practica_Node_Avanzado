'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');
const createError = require('http-errors');

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
    }catch (err) {
        next('Error when getting advertisements: ' + err);
    }
});

/**
 * GET /:id
 * Get one advertisement by id
 */
router.get('/:id', async (req, res, next) => {
    try{
        const advertisement = await Advertisement.findById(req.params.id).exec();
        // check errors
        if(!advertisement){
            return next(createError(404));
        }
        res.json({success: true, data: advertisement});
    } catch (err) {
      next(err);
    }
});


// export router
module.exports = router;