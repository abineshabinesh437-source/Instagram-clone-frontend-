import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [following, setFollowing] = useState([]);
  const currentUserId = localStorage.getItem('id'); 
  const navigate = useNavigate();

 
  const token = localStorage.getItem('token') || '';

 
  const authHeaders = {
    'Authorization': `Bearer ${token}`
  };

  // Fetch all users
  useEffect(() => {
    const controller = new AbortController();

    fetch('http://localhost:2002/Search/users', { 
      
      headers: {
        ...authHeaders
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Fetch error:", err);
        }
      });

    return () => controller.abort();
  }, [token]);


 

  
  useEffect(() => {
    fetch(`http://localhost:2002/user_profile/viewFollowing?id=${currentUserId}`, {
      headers: {
        ...authHeaders
      }
    })
      .then(res => res.json())
      .then(follows => {
       
       
        setFollowing(follows);
      })
      .catch(err => console.error("Failed to load follow data", err));
  }, [currentUserId, token]);
  console.log(following)


  const handleFollow = async (userId) => {
    try {
      const response = await fetch(`http://localhost:2002/user_profile/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...authHeaders
        },
        body: new URLSearchParams({
          followerId: currentUserId,
          followingId: userId,
        }),
      });

      if (response.ok) {
        setFollowing(data=>[...data,userId]);
      } else {
        console.error("Failed to follow user.");
      }
    } catch (error) {
      console.error("Error during follow:", error);
    }
  };

  
  const handleUnfollow = async (userId) => {
    try {
      const response = await fetch(`http://localhost:2002/user_profile/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...authHeaders
        },
        body: new URLSearchParams({
          followerId: currentUserId,
          followingId: userId,
        }),
      });

      if (response.ok) {
        setFollowing(prevFollowing => prevFollowing.filter(id => id !== userId));
      } else {
        console.error("Failed to unfollow user.");
      }
    } catch (error) {
      console.error("Error during unfollow:", error);
    }
  };

  
  const filteredData = data.filter(user =>
    user.userName.toLowerCase().includes(searchdata.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar column */}
        <div className="col-md-3 border-end min-vh-100">
          <Sidebar />
        </div>

        {/* Main content column */}
        <div className="col-md-9 p-4">
          <div className="search d-flex align-items-center gap-2 mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) => setSearchdata(e.target.value)}
            />
            <button className="btn btn-primary click">Search</button>
          </div>

          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <div className="d-flex align-items-center mb-3" key={user.id}>
                <img
                  src={
                    user.profile_pic
                      ? `data:${user.image_type};base64,${user.profile_pic}`
                      : "https://via.placeholder.com/40"
                  }
                  alt="suggestion"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div
                  className="flex-grow-1"
                  onClick={() => navigate(`/showprofile/${user.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{user.userName}</strong>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                    {user.bio || "Suggested for you"}
                  </p>
                </div>
                {following.includes(user.id) ? (
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '13px' }}
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="btn btn-primary click"
                    style={{ fontSize: '13px' }}
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            ))
          ) : data.length === 0 ? (
            <p>Loading suggestions...</p>
          ) : (
            <p>No users found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Search;
