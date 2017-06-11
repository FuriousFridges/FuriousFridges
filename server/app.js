'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/cityinfo', routes.cityinfo);
app.use('/cityphoto', routes.cityphoto);
app.use('/users', routes.users);
app.use('/questions', routes.questions);
app.use('/answers', routes.answers);
app.use('/events', routes.events);
app.use('/meetup', routes.meetup);
app.use('/restaurants', routes.restaurants);
app.use('/teleport', routes.teleport);
app.use('/origininfo', routes.origininfo);
app.use('/transit', routes.transit);

module.exports = app;
