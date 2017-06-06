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
        .then(data => {
          if (!data) {
            request
              .get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.destination}/scores/`,
                (error, response, stats) => {
                  if (error) {
                    console.error(err);
                  }
                  models.Stats.forge({ city: result.attributes.destination, city_stats: stats })
                    .save()
                    .then(data => {
                      res.status(201).send(data.attributes.city_stats);
                    })
                    .catch(err => {
                      res.status(500).send(err);
                    });
                })
                .on('error', (err) => {
                  res.status(500).send(err);
                });
          } else {
            res.status(200).send(data.attributes.city_stats);
          }

        })
        .catch(err => {
          console.log(1, err);
          res.status(503).send(err);
        }); 
    })
    .catch(err => {
      console.log(2, err);
      res.status(503).send(err);
    });


};
