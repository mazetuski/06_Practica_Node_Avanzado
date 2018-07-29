'use strict';

const express = require('express');
const router = express.Router();
const Advertisement = require('../../models/Advertisement');

/**
 * GET /tags
 * Get all tags
 */
router.get('/', async (req, res, next) => {
    try{
        const tags = await Advertisement.getTags();
        res.json({success: true, data: tags});
    }catch (err) {
        return next(err);
    }
});

module.exports = router;