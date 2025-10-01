import React, { useState } from 'react'
import Sidebar from './Sidebar'

function Addpost() {
    const[image, setimage] = useState(null);
    const[caption ,setcaption]=useState("");
    const[location,setlocation]=useState("");
  
    const max_file_size =5*1024*1024;
    const currentid = localStorage.getItem('id'); //for now it is hard coded;
 const token = localStorage.getItem('token')
    const handleimage =(e)=>{
            
        const imagedata = e.target.files[0];
         if(!imagedata){
            alert("select image")
            return;
        }
        
        if(imagedata.size>max_file_size){
            alert(`file maximum size is ${max_file_size}Mb`)
            return;
        }
        setimage(imagedata);
       


    }
    const handlepost=()=>{
   if(!image) {
    alert("upload image")
    return;
   }
   const formdata = new FormData();
      formdata.append("postImage",image);
    formdata.append("description",caption);
    formdata.append("location",location);
    formdata.append("id",currentid)
    fetch("http://localhost:2002/user_profile/addpost" ,{ //post fetch replace with correct url
    
      method:"POST",    //sent token
      body:formdata 

    } ).then((data)=>{

      if(!data.ok){
        alert("Image not posted")
      }
      return data.text();
    }).then((data)=>{
      alert("post uploaded successfully")
      setimage(null),
      setcaption(""),
      setlocation("")
    })

    

    }



  return (
    
    <div className='d-flex  vh-100'>
         <div className='w-25 side'  ><Sidebar/></div>
    
      <div className='post'>
       
        <div className='w-75'>
             <h2 className='text-center mt-4'>Add Post</h2>
            { image&&<div className='dopost'>
                <img  src={URL.createObjectURL(image)} alt='postimage' className='img-fluid  imagepost'/>
             </div>
}
            <input type='file' onChange={handleimage} placeholder='postImage'accept='image/png , image/jpg,image/jpeg,image/gif' className='form-control m-4'/>
            <input type='text' onChange={(e)=>setcaption(e.target.value)} placeholder='Caption' className='form-control m-4'/>
            <input type='text'onChange={(e)=>setlocation(e.target.value)} placeholder='Location' className='form-control m-4'/>
            <button onClick={handlepost} className='btn btn-primary click  m-4'>Post</button>
        </div>


      </div>
    </div>
  )
}

export default Addpost
