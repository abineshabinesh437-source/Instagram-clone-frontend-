import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
function Viewstory() {
    const { storyId } = useParams();
const storyIdInt = parseInt(storyId, 10);

    const[story,setstory] = useState(null);
    const token = localStorage.getItem('token')
    useEffect(()=>{
        fetch(`http://localhost:2002/home/getstorybyid?id=${storyIdInt}`).then(data=>data.json())
    .then(data=>setstory(data)  ).catch(error=>console.log(error))
    },[]);
   
      

  return (
    story?(<div className='d-flex justify-content-center align-items-center '>
      
         <img className='vh-100 ' src={`data:image/${story.image};base64,${story.imageType}`} alt='Story'/>
       
  </div>)
  :(<p>Loading</p>)

  )
}

export default Viewstory
