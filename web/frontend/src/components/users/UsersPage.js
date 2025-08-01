import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import GetUser from './GetUser';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import LoginUser from './LoginUser';
import LogoutUser from './LogoutUser';

const UsersPage = () => {
  const [key, setKey] = useState('getUser');

  return (
    <div className="section">
      <h2>User Management</h2>
      <Tabs
        id="user-operations"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="getUser" title="Get User">
          <GetUser />
        </Tab>
        <Tab eventKey="createUser" title="Create User">
          <CreateUser />
        </Tab>
        <Tab eventKey="updateUser" title="Update User">
          <UpdateUser />
        </Tab>
        <Tab eventKey="deleteUser" title="Delete User">
          <DeleteUser />
        </Tab>
        <Tab eventKey="loginUser" title="Login">
          <LoginUser />
        </Tab>
        <Tab eventKey="logoutUser" title="Logout">
          <LogoutUser />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UsersPage;