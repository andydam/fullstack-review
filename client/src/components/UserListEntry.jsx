import React from 'react';
import {ListGroupItem} from 'reactstrap';

const UserListEntry = ({user}) => (
  <ListGroupItem>
    <a href={`https://github.com/${user.name}`}>{user.name}</a>
  </ListGroupItem>
);

export default UserListEntry;