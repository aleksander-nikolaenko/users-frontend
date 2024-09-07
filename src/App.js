import React, { useState } from 'react';
// import { API } from 'aws-amplify';

function App({ signOut }) {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

  // const fetchUser = async () => {
  //   try {
  //     const response = await API.get('userApi', `/users?id=${userId}`);
  //     setUserData(response);
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  // const createUser = async () => {
  //   try {
  //     const user = { id: userId, name, email };
  //     await API.post('userApi', '/users', { body: user });
  //     alert('User created successfully');
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //   }
  // };

  // const updateUser = async () => {
  //   try {
  //     const user = { id: userId, name, email };
  //     await API.put('userApi', '/users', { body: user });
  //     alert('User updated successfully');
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };

  // const deleteUser = async () => {
  //   try {
  //     await API.del('userApi', `/users?id=${userId}`);
  //     alert('User deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

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
      {/* <button onClick={fetchUser}>Fetch User</button>
      <button onClick={createUser}>Create User</button>
      <button onClick={updateUser}>Update User</button>
      <button onClick={deleteUser}>Delete User</button> */}
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
