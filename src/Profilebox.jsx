import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alterimg from './assets/defaultimg.jpg'


function ProfileBox() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id'); // Match the saved key exactly
 const token = localStorage.getItem('token')
  // Function to navigate to a post's detail page
  const passNavigate = (postId) => {
    navigate(`/showpost/${postId}`);
  };

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    axios
      .get(`http://localhost:2002/user_profile/show_profile?id=${userId}`)   //sent the token
      .then((res) => setProfile(res.data))
      
      .catch((err) => console.error("Error fetching profile:", err));
  }, [userId]);
  console.log(profile)

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-pic">
          {profile.profile_pic ? (
            <img
              src={profile.profile_type 
    ? `data:image/${profile.image_type};base64,${profile.profile_pic}` 
    : Alterimg
  } 
              alt={profile.userName}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          ) : (
            <div>No Profile Picture</div>
          )}
        </div>

        <div className="profile-info">
          <div className="username-section marginleft">
            <h2>{profile.userName}</h2>
            <button
              onClick={() => navigate('/editprofile')}
              className="edit-btn click bu"
            >
              Edit Profile
            </button>
          </div>
          <div className="stats marginleft">
            <span><strong>{profile.post.length}</strong> posts</span>
            <span><strong>{profile.following}</strong> followers</span>
            <span><strong>{profile.followers}</strong> following</span>
          </div>
          <div className="bio marginleft">
            <strong>{profile.name}</strong>
            <p>{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="post-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {profile.post.map((post) => (
          <div
            key={post.id}
            className="post-item"
            onClick={() => passNavigate(post.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`data:image/${post.image_type};base64,${post.image}`}
              alt="Post"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileBox;
