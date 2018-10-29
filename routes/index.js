'use strict';

// Dependencies
const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');
const sessionAuth = require('../lib/sessionAuth');

router.use(sessionAuth());

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        // Get advertisements
        const advertisements = await Advertisement.list(req);
        // Render page
        res.render('index', {
            advertisements: advertisements
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
