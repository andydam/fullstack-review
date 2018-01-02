const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

let repoSchema = mongoose.Schema({
  id: Number,
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

let save = repo => {
  return new Promise((resolve, reject) => {
    Repo.create({
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
    }, (err, repoDoc) => err ? reject(err) : resolve(repoDoc));
  });
};

module.exports.save = save;