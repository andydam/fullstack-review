import React from 'react';
import {ListGroupItem} from 'reactstrap';

const RepoListEntry = ({repo}) => (
  <ListGroupItem>
    <a href={repo.htmlUrl}>{repo.fullName}</a> - {repo.stars} stars
  </ListGroupItem>
);

export default RepoListEntry;