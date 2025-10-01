import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();  // Call hook here!
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token');
   const nav = (type, storyId) => {
  switch (type) {
    case 'story':
      navigate(`/story/${storyId}`);
      break;
    case 'addstory':
      navigate('/addstory');
      break;
    default:
      break;
  }
};


  useEffect(() => {
    fetch(`http://localhost:2002/home/showstory?id=${id}`)
      .then(data => data.json())
      .then(data => setStories(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="do d-flex story-container">
      <div onClick={()=>nav('addstory')}>
        <div className='add'><i className="bi bi-plus-circle-fill"></i></div>
      </div>
      {stories.length > 0 ? (
        stories.map((story , index) => (
          <div
            key={index}
            className="mx-1 text-center"
            onClick={() =>nav(`story`,story.storyId) } // Use navigate here
            style={{ cursor: "pointer" }}
          >
            <div className="gradient-border">
              <img
                className="story-dp rounded-circle"
                src={`data:image/${story.puser_profile_pic_type};base64,${story.user_profile_pic}`}
                alt="dp"
              />
            </div>
            <p className="text-truncate" style={{ width: "50px" }}>
              {story.userName}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Stories;
