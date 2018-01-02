const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  fullName: String,
  htmlUrl: String,
  description: String,
  createdAt: String,
  updatedAt: String,
  forks: Number,
  watchers: Number
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
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      forks: repo.forks_count,
      watchers: repo.watchers_count
    }, (err, repoDoc) => err ? reject(err) : resolve(repoDoc));
  });
};

module.exports.save = save;