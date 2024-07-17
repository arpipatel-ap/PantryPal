import React, { useState, useEffect } from 'react';
import '../style/profile.scss';
import axios from 'axios';
import profilePlaceholder from '../Assets/background1.jpg';

export default function ProfileForm({userId}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    password: '',
    profile_pic: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/users/profile/${userId}`);
      if (!response.data) {
        throw new Error(`User profile not found for id ${userId}`);
      }
      setForm(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/users/editprofile', form);
      if (!response.data) {
        throw new Error('Failed to update profile');
      }
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  return (
    <div className="profile-container">
          <h1>Edit Profile</h1>
      <div className="profile-content">
        <div className="profile-pic">
        <img src={form.profile_pic || profilePlaceholder} alt="ProfilePic" />
        </div>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" name="password" value={form.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleInputChange}></textarea>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
