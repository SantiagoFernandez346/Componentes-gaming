import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const apiUrl = 'http://localhost:4000/users';

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Error fetching users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        // Use error message from backend if available
        throw new Error(data.error || 'Error adding user');
      }
      setUsers((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw error so caller can catch it
    } finally {
      setLoading(false);
    }
  };

  const loginUser = (user) => {
    setLoggedInUser(user);
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, fetchUsers, loggedInUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
