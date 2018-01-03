import React from 'react';
import UserListEntry from './UserListEntry.jsx';

const UserList = ({users}) => (
  <div>
    <h4> User List Component </h4>
    <b>There are {users.length} users.</b>
    <ul>{users.map(user => <UserListEntry user={user} key={user.id} />)}</ul>
  </div>
);

export default UserList;