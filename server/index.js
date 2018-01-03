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

app.post('/repos', (req, res) => db.checkUser(req.body.username.toLowerCase())
  .then(isInDb =>{
    if (isInDb) {
      return Promise.reject({status: 1});
    }
    return getUserByUsername(req.body.username);
  })
  .then(user => {
    if (user.message) {
      return Promise.reject({message: user.message, status: 2});
    }
    return db.saveUser(user);
  })
  .then(() => getReposByUsername(req.body.username))
  .then(data => {
    if (data.message) {
      return Promise.reject({message: data.message, status: 3});
    }
    return Promise.all(data.map(repo => db.saveRepo(repo)));
  })
  .then(repoDocs => res.json({imported: repoDocs.length, status: 0}))
  .catch(err => err.status ? res.json(err) : res.status(500).json(err)));

app.get('/repos', (req, res) => db.getRepos()
  .then(repos => res.json(repos))
  .catch(err => res.status(500).json(err)));

app.get('/users', (req, res) => db.getUsers()
  .then(repos => res.json(repos))
  .catch(err => res.status(500).json(err)));

let port = 1128;

app.listen(port, console.log(`listening on port ${port}`));
