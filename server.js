const express = require('express');
const request = require('request');
const buildUrl = require('build-url');

const port = process.env.PORT || 3000;

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
  const queryStrings = req.query;
  const url = buildUrl('http://www.recipepuppy.com/api/', {
    queryParams: queryStrings
  })
  console.log(url);
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      res.send({
        'errorMessage': 'Unable to handle request'
      });
    } else if (response.statusCode === 400) {
      res.send({
        'errorMessage': 'Unable to fetch recipes'
      });
    } else if (response.statusCode === 200) {
      res.send(body.results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
