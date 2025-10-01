import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Showprofile.css'; 
function Showprofile() {
  const { id } = useParams(); // fetch user ID from URL
  const [profile, setProfile] = useState(null);
   const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:2002/user_profile/show_profile?id=${id}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error("Error fetching profile:", err));
  }, [id]);

  if (!profile) return <div className="showprofile-loading">Loading profile...</div>;

  return (
    <div className="showprofile-container">
      {/* Profile Info Section */}
      <div className="showprofile-header">
        <div className="showprofile-avatar">
          <img src= {`data:image/${profile.image_type};base64,${profile.profile_pic}`} alt={profile.userName} />
        </div>
        <div className="showprofile-details">
          <h2 className="showprofile-username">{profile.userName}</h2>
          <div className="showprofile-stats">
            <span><strong>{profile.post.length}</strong> posts</span>
            <span><strong>{profile.followers}</strong> followers</span>
            <span><strong>{profile.following}</strong> following</span>
          </div>
          <div className="showprofile-bio">
            <strong>{profile.name}</strong>
            <p>{profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Post Grid Section */}
      <div className="showprofile-post-grid">
        {profile.post.map(post => (
          <div key={post.id} className="showprofile-post-card">
            <img src={ `data:image/${post.imageType};base64,${post.image}`} alt="Post" /> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showprofile;
