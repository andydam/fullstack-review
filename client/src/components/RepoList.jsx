import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    <b>Top {repos.length} repos.</b>
    <ul>{repos.map(repo => <RepoListEntry repo={repo} key={repo.id} />)}</ul>
  </div>
);

export default RepoList;