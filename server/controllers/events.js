'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const config = require('config')['Eventbrite'];

module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
        .then((data) => {
          request.get(`https://www.eventbriteapi.com/v3/events/search/?token=${config.clientID}&sort_by=distance&location.address=${result.attributes.destination}&categories=109%2C133%2C110&location.within=10mi&start_date.keyword=this_week`, 
            (error, response, body) => {
              if (error) {
                console.error(error);
              } else {
                body = JSON.parse(body);
                var events = body.events;
                var eventData = {};
                var dataLength = 10;
                var currentIndex = 0;
                var validData = true;
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
              }
            });
          
        });
    });

};