'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const config = require('config')['Google_Places'];


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
      .then((data) => {
        request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.clientID}&address=${result.attributes.destination}`,
              (error, response, body) => {
                if (error) {
                  console.error(err);
                } else {
                  var geoCoords = JSON.parse(body).results[0].geometry['location'];
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=transit_station&key=${config.clientID}`, 
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var stations = body.results;
                      var stationData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      while (dataLength > 0 && validData) {
                        var stationObj = {};
                        stationObj['name'] = stations[currentIndex].name;
                        stationObj['type'] = stations[currentIndex].types[0];
                        if (stations[currentIndex].photos) {
                          var reference = stations[currentIndex].photos[0].photo_reference;
                          stationObj['image'] = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${config.clientID}`;
                        } else {
                          stationObj['image'] = stations[currentIndex].icon;
                        }
                        stationData[currentIndex] = stationObj;
                        dataLength--;
                        if (!stations[currentIndex + 1]) {
                          validData = false;
                        }
                        currentIndex++;
                      }
                      res.send(stationData);
                    });
                }
              });
      }); 
    });
};
