import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStory() {
 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token'); 
  const currentUserId = localStorage.getItem('id'); 

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setError('Image is required!');
      return;
    }

    setLoading(true); 
    setError(''); 

    
    const formData = new FormData();
    formData.append('image', image);  

    formData.append('id', currentUserId);  

   
    fetch('http://localhost:2002/home/addstory', {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      body: formData, 
    })
      .then((res) => res.text()) 
      .then((data) => {
        if (data) {
         
          navigate(`/home`);
        } else {
          setError(data.message || 'An error occurred');
        }
      })
      .catch((err) => {
        setError('An error occurred while adding the story');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Add a Story</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="text-center">
       
        <div className="form-group mb-4">
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }} 
          />
          <label htmlFor="image" className="btn btn-outline-primary">
            {image ? (
              <img
                src={URL.createObjectURL(image)} 
                alt="Preview"
                className="img-fluid"
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
            ) : (
              <i className="bi bi-camera-fill" style={{ fontSize: '2rem' }}></i>
            )}
            <div className="mt-2">{image ? 'Change Image' : 'Add Image'}</div>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Post Story'}
        </button>
      </form>
    </div>
  );
}

export default AddStory;
