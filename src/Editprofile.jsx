import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 
    const id = localStorage.getItem('id');  

    const formData = new FormData();
    formData.append('id', id);
    formData.append('username', username);
    formData.append('fullname', name);
    formData.append('bio', bio);

    if (profileImage) {
      formData.append('profile', profileImage);
    }

    try {
      const response = await fetch('http://localhost:2002/user_profile/editprofile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` // 
          
        },
        body: formData,
      });

      if (response.ok) {
        alert('Profile updated!');
        navigate('/profile');
      } else {
        const error = await response.text();
        alert('Update failed: ' + error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>

        <div className="profile-pic-section">
          <div className="profile-pic-preview">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile Preview" />
            ) : (
              <img src="/default-profile.jpg" alt="Default Profile" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Bio</label>
          <textarea rows="3" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>

          <button onClick={()=>response }  type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
