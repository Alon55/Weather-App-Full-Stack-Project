const express = require('express');
const router = express.Router();
const City = require('../model/City');
const moment = require('moment');
const request = require('request');
const { json } = require('body-parser');


router.get('/city/:city', function (req, res) {
    const city = req.params.city;
        request(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=21c9894d797e505b380acee50bbb8fa3`,
          function (err, response) {
              let data = JSON.parse(response.body)
              if(data.cod === 200){
              data = {
                  name: data.name,
                  temperature: Math.round(data.main.temp),
                  condition: data.weather[0].description,
                  conditionPic: data.weather[0].icon,
                  cod: data.cod
                }
              res.send(data)}
              else{res.send(data)};
            }
        );
  });

  router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
      res.send(cities);
    });
  });

  router.post('/city', function (req, res) {
    let data = req.body;
    //if(City.findOne({"name": data.name})){res.end()}
    //else{
        let newCity = new City({
            name: data.name,
            temperature: data.temperature,
            condition: data.condition,
            conditionPic: data.conditionPic,
          });
          newCity.save()
          res.end();
   //}
    
  });

  router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName;
    City.findOneAndDelete({"name": cityName}, function () {res.end()})
  });

  
module.exports = router;
