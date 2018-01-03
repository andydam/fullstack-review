import React from 'react';

const RepoListEntry = ({repo}) => (
  <li>
    <a href={repo.htmlUrl}>{repo.fullName}</a> - {repo.stars} stars
  </li>
);

export default RepoListEntry;