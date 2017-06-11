'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const TransitController = require('../controllers').Transit;

router.route('/')
  .get(TransitController.getAll);


module.exports = router;

