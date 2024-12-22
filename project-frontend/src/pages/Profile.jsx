import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/home" className="home-button">Home</Link>
        <div className="profile-picture">
          <img src="https://via.placeholder.com/60" alt="User" />
        </div>
      </header>

      <div className="profile-container">
        <nav className="profile-nav">
          <ul>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#orders">Orders</a></li>
          </ul>
        </nav>

        <div className="profile-body">
          <section className="profile-content">
            <h2>Profile Details</h2>
            <label>Email Address</label>
            <input type="email" value="admin1@gmail.com" disabled />
            <label>Username</label>
            <input type="text" value="Admin1" disabled />

            <h2>Order History</h2>
            <p>No recent orders available.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
