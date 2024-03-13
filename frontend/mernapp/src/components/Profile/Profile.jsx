// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/api';


const Profile = () => {
 const { currentUser } = useAuth();
 const [profile, setProfile] = useState({});

 useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile(currentUser.id);
      setProfile(userProfile);
    };

    fetchProfile();
 }, [currentUser]);

 const handleUpdate = async (e) => {
    e.preventDefault();
    // Assuming you have a form to update the profile
    const updatedProfile = { ...profile, name: e.target.name.value };
    await updateUserProfile(currentUser.id, updatedProfile);
    setProfile(updatedProfile);
 };

 return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
 );
};

export default Profile;
