'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');



app.get('/events', (req, res) => {
  var location = req.query.location;
  request.get(`https://www.eventbriteapi.com/v3/events/search/?token=UHLKIOWHWZNIOUNFTLKN&sort_by=distance&location.address=${location}&categories=109%2C133%2C110&location.within=10mi&start_date.keyword=this_week`, (error, response, body) => {
    if (error) {
      console.error(error);
    }
    body = JSON.parse(body);
    var events = body.events;
    var eventData = {};
    dataLength = 10;
    currentIndex = 0;
    validData = true;
    while (dataLength > 0 && validData) {
      var eventObj = {};
      eventObj['description'] = events[currentIndex].name.text;
      eventObj['url'] = events[currentIndex].url;
      if (events[currentIndex].logo) {
        eventObj['img'] = events[currentIndex].logo.url;
        eventData[currentIndex] = eventObj;
        dataLength--;
      }
      if (!events[currentIndex + 1]) {
        validData = false;
      }
      currentIndex++;
    }
    res.send(eventData);
  });
});
