const request = require('supertest');
require('dotenv').config();
const assert = require('assert');

// app charge
const app = require('../../app');

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