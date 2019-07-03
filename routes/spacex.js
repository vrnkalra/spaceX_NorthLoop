var express = require('express');
var request = require('request');

var router = express.Router();

const baseurl = 'https://api.spacexdata.com/v3';

router.get('/launches', async (req, res, next) => {

  request({
    url: baseurl + '/launches',
    json: true
  }, function (error, response, body) {
    if (!error) {
      res.status(200).send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });

});

router.get('/launch/:flightNumber', async (req, res, next) => {

  console.log(req.params.flightNumber)

  if (!req.params.flightNumber) {
    console.log("hi")
    res.status(400).send({
      error: "Flight Number is missing."
    })
  }

  request({
    url: baseurl + '/launches/' + req.params.flightNumber,
    json: true
  }, function (error, response, launchDetails) {
    if (!error) {
      if (launchDetails.launch_site.site_id) {
        request({
          url: baseurl + '/launchpads/' + launchDetails.launch_site.site_id,
          json: true
        }, function (error, response, launchPadDetails) {
          if (!error) {
            res.status(200).send({
              launchDetails,
              launchPadDetails
            })

          } else {
            res.status(response.statusCode).send(error);
          }
        });
      } else {
        res.status(200).send({
          launchDetails,
          launchPadDetails: "No launch pad Found"
        })
      }
    } else {
      res.status(response.statusCode).send(error);
    }
  });

});

module.exports = router;