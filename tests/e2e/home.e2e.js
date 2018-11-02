const request = require('supertest');
require('dotenv').config();
const assert = require('assert');

// app charge
const app = require('../../app');

describe('Test login', function () {
  it('should return 302', function (done) {
    request(app)
        .get('/')
        .expect(302)// verify 302 redirection to login
        .then(response => {
          assert(response.header.location, '/login'); // login redirection
          done();
        })
  });
});

describe('Login', function (done) {
  it('should return 200', function () {
    request(app)
        .get('/login')
        .expect(200, done); // verify 200 status code
  });
});