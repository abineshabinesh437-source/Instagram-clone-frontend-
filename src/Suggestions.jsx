import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const id = localStorage.getItem('id');
 const token = localStorage.getItem('token')
 const nav = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:2002/user_profile/show_profile?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));

    fetch('http://localhost:3000/suggestions')
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-3" style={{ maxWidth: '300px', fontSize: '14px' }}>
      
      
      {profile ? (
        <div className="d-flex align-items-center mb-4">
          <img
            src={`data:image/${profile.image_type};base64,${profile.profile_pic}`} //profile_type profile.profile_pic
            alt="profile"
            className="rounded-circle me-3"
            width="50"
            height="50"
          />
          <div className="flex-grow-1">
            <strong>{profile.userName}</strong>
            <p className="text-muted mb-0">{profile.bio}</p>
          </div>
          <p onClick={()=>nav('/')}className="text-primary mb-0" style={{ cursor: 'pointer' }}>
            Switch
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

     
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="text-muted fw-bold mb-0">Suggestions For You</p>
        <p className="text-dark mb-0" style={{ fontSize: '12px', cursor: 'pointer' }}>
          See All
        </p>
      </div>

      
      {suggestions.length > 0 ? (
        suggestions.map((user) => (
          <div className="d-flex align-items-center mb-3" key={user.id}>
            <img
              src={user.profile_pic}
              alt="suggestion"
              className="rounded-circle me-3"
              width="40"
              height="40"
            />
            <div className="flex-grow-1">
              <strong>{user.username}</strong>
              <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                Suggested for you
              </p>
            </div>
            <p className="text-primary mb-0" style={{ fontSize: '13px', cursor: 'pointer' }}>
              Follow
            </p>
          </div>
        ))
      ) : (
        <p>Loading suggestions...</p>
      )}
    </div>
  );
}

export default Suggestions;
