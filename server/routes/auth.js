const express = require('express');
const path = require('path');
const middleware = require('../middleware');
const UserController = require('../controllers').Users;


const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'), {
      user: req.user
    });
  });


router.route('/createuser')
  .get(middleware.auth.verify, UserController.create);


router.route('/authenticated')
  .get(middleware.auth.verify, (req, res) => {
    res.send(req.user);
  });


router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.route('/settings')
  .get(middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/form')
  .get(middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));


router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));


module.exports = router;
