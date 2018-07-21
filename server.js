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

app.get('/match', (req, res) => {
  let matchData = 'yo';


    res.send(matchData);

});

app.get('/vs', (req, res) => {
  let vsData = 'hee';

    res.send(vsData);
});

// app.get('/searchbyname', (req, res) => {
//   name = Object.keys(req.query)[0];
//   res.send(name);
// });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
