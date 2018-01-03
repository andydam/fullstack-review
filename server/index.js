const express = require('express');
const bodyParser = require('body-parser');
const {getReposByUsername, getUserByUsername} = require('../helpers/github.js');
const db = require('../database');
let app = express();

app.post('/repos', bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} on ${req.path}`);
  if (req.body) {
    console.log(`Data: ${JSON.stringify(req.body)}`);
  }
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res, next) => {
  db.checkUser(req.body.username.toLowerCase())
    .then(isInDb => {
      if (isInDb) {
        return Promise.reject('USEREXISTS');
      }
      return getUserByUsername(req.body.username);
    })
    .then(user => {
      return user.message ? Promise.reject(user.message) : db.saveUser(user);
    })
    .then(() => getReposByUsername(req.body.username))
    .then(data => {
      return data.message ? Promise.reject(data.message) : Promise.all(data.map(repo => db.save(repo)));
    })
    .then(repoDocs => {
      res.statusCode = 200;
      res.end(JSON.stringify(repoDocs));
    })
    .catch(err => {
      err === 'USEREXISTS' ? res.statusCode = 200 : res.statusCode = 500;
      res.end(JSON.stringify(err));
    });
});

app.get('/repos', (req, res) => {
  db.get()
    .then(repos => {
      res.statusCode = 200;
      res.end(JSON.stringify(repos));
    })
    .catch(err => {
      res.statusCode = 500;
      res.end(JSON.stringify(err));
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

