import React from 'react';
import UserListEntry from './UserListEntry.jsx';
import {ListGroup} from 'reactstrap';

const UserList = ({users}) => (
  <div className='col-md-4'>
    <h4> User List Component </h4>
    <b>There are {users.length} users.</b>
    <ListGroup>{users.map(user => <UserListEntry user={user} key={user.id} />)}</ListGroup>
  </div>
);

export default UserList;