const express = require('express');
const request = require('request');

const app = express();

app.use(express.static(__dirname + '/view'));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/recipes', (req, res) => {
  request({
    url: `http://www.recipepuppy.com/api/?i=`,
    json: true
  }, (error, response, body) => {
    if (error) {
      res.send({
        'errorMessage': 'Unable to handle request'
      });
    } else if (response.statusCode === 400) {
      console.log('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.listen(3000);
