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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;