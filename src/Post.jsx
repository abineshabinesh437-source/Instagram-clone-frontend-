import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [posts, setPosts] = useState([]);
  const [userLikePosts, setUserLikePosts] = useState(new Set()); // Use a Set for faster lookup
  const navigate = useNavigate();

  

  

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('id'); // Get current user ID
  
  function likechange(){
        
  }

  useEffect(() => {
    // Fetch posts of followed users
    fetch(`http://localhost:2002/home/post?id=${currentUserId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log("Error fetching posts:", error));
  }, [currentUserId]);

  useEffect(() => {
    // Fetch the list of posts liked by the current user
    fetch(`http://localhost:2002/user_profile/userlikedpost?userId=${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        const likedPosts = new Set(data); // Store liked posts in a Set for faster lookup
        setUserLikePosts(likedPosts);
      })
      .catch((error) => console.log("Error fetching liked posts:", error));
  }, [currentUserId]);

  const handlelike = (postId) => {
    const liked = userLikePosts.has(postId);

    // Toggle like/unlike post
    const url = liked
      ? `http://localhost:2002/user_profile/unlike?postId=${postId}&userId=${currentUserId}`
      : `http://localhost:2002/user_profile/like?postId=${postId}&userId=${currentUserId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.text()) // Expect a JSON response, not just text
      .then((data) => {
        // Update liked posts state
        const updatedLikes = new Set(userLikePosts);
        if (liked) {
         
          updatedLikes.delete(postId);
        
        } else {
          updatedLikes.add(postId);
         
        }
        setUserLikePosts(updatedLikes);
      })
      .catch((error) => console.log("Error toggling like:", error));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      {posts.length > 0 ? (
        posts.map((data) => (
          <div className="card mb-4 shadow-sm border-0" key={data.postId}>
            {/* Header */}
            <div className="card-header bg-white d-flex align-items-center justify-content-between border-0">
              <div className="d-flex align-items-center" onClick={() => navigate(`/showprofile/${data.userId}`)}>
                <img
                  className="rounded-circle me-2"
                  src={`data:image/${data.userProfileType};base64,${data.userProfile || 'defaultBase64Image'}`}
                  alt="profile"
                  width="40"
                  height="40"
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <h6 className="mb-0 fw-bold" style={{ fontSize: '14px' }}>
                    {data.userName}
                  </h6>
                  <small className="text-muted">{data.location}</small>
                </div>
              </div>
            </div>

            {/* Post Image */}
            <img
              src={`data:image/${data.imageType};base64,${data.image}`}
              className="card-img-top"
              alt="Post"
              style={{ objectFit: 'cover', maxHeight: '500px' }}
            />

            {/* Actions */}
            <div className="card-body pb-2 pt-3">
              <div className="d-flex gap-3 mb-2 fs-5">
                <div  onClick={() => handlelike(data.postId) }> {/* Use postId here */}
                  {userLikePosts.has(data.postId) ? ( // Check if the post is liked
                    <i className="bi bi-heart-fill text-danger"></i> // Liked
                  ) : (
                    <i className="bi bi-heart"></i> // Not liked
                  )}
                </div>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>
              </div>

              {/* Likes */}
              <strong className="d-block mb-1">{data.like }Likes</strong> 

              {/* Caption */}
              <p className="mb-0">
                <strong>{data.bio}</strong> 
              </p>

              {/* Timestamp */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">Loading posts...</div>
      )}
    </div>
  );
}

export default Post;
