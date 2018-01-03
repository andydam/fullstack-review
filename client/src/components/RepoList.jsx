import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';
import {ListGroup} from 'reactstrap';

const RepoList = ({repos}) => (
  <div className='col-md-8'>
    <h4> Repo List Component </h4>
    <b>Top {repos.length} repos.</b>
    <ListGroup>{repos.map(repo => <RepoListEntry repo={repo} key={repo.id} />)}</ListGroup>
  </div>
);

export default RepoList;