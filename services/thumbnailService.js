'use strict';

// Dependencies
const cote = require('cote');
const responder = new cote.Responder({name: 'Thumbnail Service'});
const sharp = require('sharp');

/**
 * Listener for resize images
 */
responder.on('thumbnail', async (req, cb) => {
  console.log(`Thumbnail petition for image ${req.image}`);
  const imagePath = `../public/images/${req.image}`;
  const thumbnailName = `thumbnail-${req.image}`;
  const thumbnailPath = `../public/images/${thumbnailName}`;
  // round svg for apply a overlay
  const rounded = Buffer.from(
      `<svg><rect x="0" y="0" width="${req.sizeX}" height="${req.sizeY}" rx="50" ry="50"/></svg>`
  );
  console.log(imagePath);
  // resize img
  await sharp(imagePath)
      .resize(req.sizeX, req.sizeY)
      .toFile(thumbnailPath)
      .then(() => {
        // send thumbnail to requester
        console.log(`Thumbnail generated as ${thumbnailName}`);
        return cb(thumbnailName);
      })
      .catch(err => {
        throw new Error(err.message);
      });
});