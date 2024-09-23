import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    walletBalance: 0,
  });

  const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8081/api/auth/getUserBy/${userId}`) // Fetch data using the user ID
        .then(response => response.json())
        .then(data => {
          setUser({
            username: data.username,
            email: data.email,
            walletBalance: data.walletBalance,
          });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  return (
    <div className="user-profile-page">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Wallet Balance:</strong> ₹{user.walletBalance.toFixed(2)}</p>
    </div>
  );
};

export default Profile;
