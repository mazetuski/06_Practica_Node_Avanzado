// Dependencies
require('dotenv').config();
const connectMongoose = require('./connectMongoose');
const data = require('../advertisement');
const Advertisement = require('../models/Advertisement');

// Wait for open connection
connectMongoose.once('open', () => {

// Drop database
    connectMongoose.dropDatabase(function (err) {
        // if error then exit
        if (err) {
            console.log('Error on drop database:', err);
            process.exit(1);
        }
        console.log('Database ' + connectMongoose.name + ' removed');
    });

    insertFromData(data.anuncios);

});

/**
 * Function for insert new ads from data
 * @param data
 * @returns {Promise<void>}
 */
async function insertFromData(data) {
    try {
        for (const ad in data) {
            const newAd = new Advertisement(data[ad]);
            const adResponse = await newAd.save();
            console.log("Added: " + adResponse.id)
        }
        console.log('initialized database succesfully!');
        process.exit(0);
    } catch (err) {
        console.log("Error insert data:", err);
        process.exit(1);
    }
}

