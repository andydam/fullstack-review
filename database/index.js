const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

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
    });
  });
};

let get = () => {
  return new Promise((resolve, reject) => {
    Repo.find(null, null, {
      limit: 25,
      sort: {
        stars: -1
      }
    }, (err, docs) => err ? reject(err) : resolve(docs));
  });
};

module.exports.save = save;
module.exports.get = get;