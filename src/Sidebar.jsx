import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function Sidebar() {
  const navigate = useNavigate();


  const handleNavigation = (d)=>{
    switch (d){

      case 'home':
        navigate('/home');
        break;
      case 'search':
        navigate('/search');
        break;
        case 'message':
          navigate('/message');
          break;
          case 'addpost':
          navigate('/addpost');
          break;
          
              case 'profile':
                navigate('/profile');
                break;
                default:
                  navigate('/');
                  break;
    }

  }
  return (
  <div className='m-4'>
    <div className='d-flex flex-column gap-3'>
   <div className="logo mb-4 text-center">
        <img
          src="src/assets/nearlogo.jpg"
          alt="logo"
          style={{ width: '100px', objectFit: 'contain' }}
        />
      </div>
      <div className='pad click bis'  onClick={()=>handleNavigation('home')}><i className="bi  bi-house"></i> <b> Home</b></div>
      <div className='click bis'  onClick={()=>handleNavigation('search')}> <i className="bi bi-search"></i><b> Search</b></div>
      <div className='click bis'  onClick={()=>handleNavigation('message')}><i className="bi bi-chat-dots"></i> <b>Message</b></div>
      <div className='click bis'  onClick={()=>handleNavigation('addpost')}><i className="bi bi-plus-circle"></i> <b>Add Post</b></div>
      <div className='click  bis ' onClick={()=>handleNavigation('profile')}><i  className="bi bi-person"></i><b>Profile</b> </div>
    </div>
   

</div>
)
}
export default Sidebar
