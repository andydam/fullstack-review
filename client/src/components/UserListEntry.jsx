import React from 'react';

const UserListEntry = ({user}) => (
  <li>
    <a href={`https://github.com/${user.name}`}>{user.name}</a>
  </li>
);

export default UserListEntry;