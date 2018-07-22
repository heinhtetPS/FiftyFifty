const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      request = require('request');
      async = require('async');
      extend = require('extend');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/country', (req, res) => {
  let countryData = {};
  let cCode = Object.keys(req.query);
  let queryURL = 'https://restcountries.eu/rest/v2/alpha/' + cCode;

  request(queryURL, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      var json = JSON.parse(body);
      countryData = json;
      console.log(countryData);

    } else {
      console.log(err);
    }
  });

    res.send(countryData);

});


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
