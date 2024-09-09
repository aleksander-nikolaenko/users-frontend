import React, { useState } from 'react';
import { get, post, put, del } from '@aws-amplify/api';
import { fetchAuthSession } from '@aws-amplify/auth';

function App({ signOut }) {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchToken = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      // console.log(token);
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const fetchUsers = async () => {
    try {
      const token = await fetchToken();
      if (!token) return;
      const response = await get({
        apiName: process.env.REACT_APP_API_NAME,
        path: `/users?id=${userId}`,
        options: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }).response;
      const data = await response?.body.json();
      setUserData(data);
    } catch (error) {
      const data = error.response?.body || '';
      if (data) {
        JSON.parse(error.response?.body);
        setUserData(data);
      }
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const token = await fetchToken();
      if (!token) return;
      const user = { id: userId, name, email };
      const formData = new FormData();
      for (const [key, value] of Object.entries(user)) {
        formData.append(key, value);
      }
      const response = await post({
        apiName: process.env.REACT_APP_API_NAME,
        path: `/users`,
        options: {
          body: user,
          headers: { Authorization: `Bearer ${token}` },
        },
      }).response;
      const data = await response?.body.json();
      setUserData(`User with id:${data.id} created successfully`);
    } catch (error) {
      const data = error.response?.body || '';
      if (data) {
        JSON.parse(error.response?.body);
        setUserData(data);
      }
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const token = await fetchToken();
      if (!token) return;
      const user = { id: userId, name, email };
      const response = await put({
        apiName: process.env.REACT_APP_API_NAME,
        path: `/users?id=${userId}`,
        options: {
          body: user,
          headers: { Authorization: `Bearer ${token}` },
        },
      }).response;
      const data = await response?.body.json();
      setUserData(`User with id:${data.id} updated successfully`);
    } catch (error) {
      const data = error.response?.body || '';
      if (data) {
        JSON.parse(error.response?.body);
        setUserData(data);
      }
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const token = await fetchToken();
      if (!token) return;
      await del({
        apiName: process.env.REACT_APP_API_NAME,
        path: `/users?id=${userId}`,
        options: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }).response;
      setUserData(`User with id:${userId} deleted successfully`);
    } catch (error) {
      const data = error.response?.body || '';
      if (data) {
        JSON.parse(error.response?.body);
        setUserData(data);
      }
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <button onClick={signOut}>Sign Out</button>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchUsers}>Fetch Users</button>
      <button onClick={createUser}>Create User</button>
      <button onClick={updateUser}>Update User</button>
      <button onClick={deleteUser}>Delete User</button>
      {userData && (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
