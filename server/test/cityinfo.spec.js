'use strict';
const request = require('supertest');
const express = require('express');
const dbUtils = require('../../db/lib/utils.js');
const app = require('../app.js');

describe('CityInfo API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /cityinfo', function (done) {
    request(app)
      .get('/cityinfo')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 1
      })
      .end(done);
  });

  it('sends 404  if GET requests to /cityinfo does not exist', function (done) {
    request(app)
      .get('/cityinfo')
      .expect(404)
      .end(done);
  });

});
