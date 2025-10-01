import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Showpost() {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
   const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="show-post-container">
      <h2>{post.title || 'Post'}</h2>
      <img src={post.image} alt="Post" style={{ width: '100%', maxWidth: '500px' }} />
      <p>{post.description || 'No description available.'}</p>
    </div>
  );
}

export default Showpost;
