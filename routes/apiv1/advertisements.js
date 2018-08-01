'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Multer = require('multer');
const upload = new Multer({dest: 'public/images'});
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
router.post('/', upload.single('photo'), async (req, res, next) => {
    try {
        const photo = req.file;
        if(!photo){
            return next('Advertisement validation failed: photo: Path `photo` is required.');
        }
        const data = req.body;
        data.photo = photo.filename;
        // Create advertisement with post params
        const advertisement = new Advertisement(data);
        // save on database
        const adResponse = await advertisement.save();
        // return data
        res.json({success: true, data: adResponse});
    } catch (err) {
        return next(err);
    }
});




// export router
module.exports = router;