'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').Users;

router.route('/')
  .get(UserController.getAll)
  .put(UserController.update)
  .post(UserController.create)
  ;

module.exports = router;
