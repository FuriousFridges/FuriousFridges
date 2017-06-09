'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
        .then((data) => {
          request.get('https://api.meetup.com/2/concierge?zip=94103&offset=0&format=json&photo-host=secure&page=500&fields=group_photo&sig_id=128876412&sig=8f5b141f9cc7f7931f6f8a60911ca888af0ddde6', 
            (error, response, body) => {
              if (error) {
                console.error(error);
              }
              var body = JSON.parse(body);
              var meetups = body.results;
              var meetupData = {};
              var dataLength = 10;
              var currentIndex = 0;
              var validData = true;
              while (dataLength > 0 && validData) {
                var meetupObj = {};
                meetupObj['name'] = meetups[currentIndex].name;
                meetupObj['type'] = meetups[currentIndex].group.who;
                meetupObj['url'] = meetups[currentIndex].event_url;
                if (meetups[currentIndex].group.group_photo) {
                  meetupObj['image'] = meetups[currentIndex].group.group_photo.photo_link; 
                } else {
                  meetupObj['image'] = 'http://tctechcrunch2011.files.wordpress.com/2011/01/meetuplogo.jpeg';
                }
                meetupData[currentIndex] = meetupObj;
                dataLength--;
                if (!meetups[currentIndex + 1]) {
                  validData = false;
                }
                currentIndex++;
              }
              res.send(meetupData);
            });
          
        });
    });
};
