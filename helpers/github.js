const request = require('request');
const config = require('../config.js');

let getReposByUsername = username => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.github.com/users/${username}/repos?sort=updated`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }}, (err, resp, body) => err ? reject(err) : resolve(JSON.parse(body)));
  });
};

let getUserByUsername = username => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.github.com/users/${username}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }}, (err, resp, body) => err ? reject(err) : resolve(JSON.parse(body)));
  });
};

module.exports = {
  getReposByUsername,
  getUserByUsername
};