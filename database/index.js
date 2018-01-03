const mongoose = require('mongoose');
const dburl = process.env.MONGO_URL ? `${process.env.MONGO_URL}` : 'mongodb://localhost/fetcher';
mongoose.connect(dburl, {useMongoClient: true});

// 
// Repo model (used for storing repo data)
// 
let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  fullName: String,
  htmlUrl: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  forks: Number,
  watchers: Number,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let saveRepo = repo => {
  return new Promise((resolve, reject) => Repo.create({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description,
    createdAt: new Date(repo.created_at),
    updatedAt: new Date(repo.updated_at),
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    stars: repo.stargazers_count
  }, (err, repoDoc) => {
    if (err) {
      if (err.code === 11000) {
        console.log(`Duplicate repo entry for ${repo.id} - ${repo.name}`);
        resolve({
          id: repo.id,
          fullName: repo.full_name,
          duplicate: true
        });
      }
      reject(err);
    } else {
      console.log(`Repo ${repoDoc.id} - ${repoDoc.name} added to database`);
      resolve(repoDoc);
    }
  }));
};

let getRepos = () => {
  return new Promise((resolve, reject) => Repo.find(null, null, {
    limit: 25,
    sort: {
      stars: -1
    }
  }, (err, docs) => err ? reject(err) : resolve(docs)));
};

// 
// User model (used for storing already processed users)
// 
let userSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String
});

let User = mongoose.model('User', userSchema);

let saveUser = user => {
  return new Promise((resolve, reject) => User.create({
    id: user.id,
    name: user.login.toLowerCase()
  }, (err, userDoc) => err ? reject(err) : resolve(userDoc)));
};

let checkUser = user => {
  return new Promise((resolve, reject) => User.count({name: user}, 
    (err, userDoc) => err ? reject(err) : resolve(Boolean(userDoc))));
};

let getUsers = () => {
  return new Promise((resolve, reject) => User.find(null, null, {
    sort: {
      name: 1
    }
  }, (err, docs) => err ? reject(err) : resolve(docs)));
};

module.exports = {
  saveRepo,
  getRepos,
  saveUser,
  checkUser,
  getUsers
};