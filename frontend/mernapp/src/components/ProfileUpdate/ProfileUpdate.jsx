// src/components/ProfileUpdate/ProfileUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../services/api';

const ProfileUpdate = () => {
 const { currentUser } = useAuth();
 const [profile, setProfile] = useState({ name: '', email: '' });

 useEffect(() => {
    // Assuming you have a way to fetch the current user's profile
    // For simplicity, we'll just use the currentUser object
    setProfile({ name: currentUser.name, email: currentUser.email });
 }, [currentUser]);

 const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(currentUser.id, profile);
      alert('Profile updated successfully!');
      // Optionally, redirect or refresh the profile page
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
 };

 return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
 );
};

export default ProfileUpdate;
