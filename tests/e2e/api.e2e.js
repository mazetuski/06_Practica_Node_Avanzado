const request = require('supertest');
require('dotenv').config();
const assert = require('assert');
const initializeDb = require('../../lib/install_bd').initializeDb;
const Advertisements = require('../../models/Advertisement');

// app charge
const app = require('../../app');

// load database test
before(function (done) {
  initializeDb().then(() => {
    done();
  });
});

describe('Test login api', function () {
  it('should return 200', function (done) {
    request(app)
        .post('/apiv1/login')
        .send({email: 'user@example.com', password: '1234'})
        .expect(200)// verify have a 200 status code
        .then(response => {
          assert(response.body.success, true); // check no error
          done();
        })
  });
});

describe('Api test', function () {

  let token = null;

  // get token
  before(function(done) {
    request(app)
        .post('/apiv1/login')
        .send({email: 'user@example.com', password: '1234'})
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
  });

  it('Advertisement list', function (done) {
    request(app)
        .get('/apiv1/advertisements/?token='+token)
        .expect(200, done) // verify have a 200 status code
  });

  it('Advertisement find by id', function (done) {
    Advertisements.findOne().then((advertisement) => {
      request(app)
          .get(`/apiv1/advertisements/${advertisement._id}?token=${token}`)
          .expect(200, done) // verify have a 200 status code
    });
    });

  it('Tag list', function (done) {
    request(app)
        .get('/apiv1/tags?token='+token)
        .expect(200, done) // verify have a 200 status code
  });

});