import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { element } from 'prop-types'
import Viewstory from './Viewstory.jsx'
import Profile from './Profile.jsx'
import EditProfile from './Editprofile.jsx'
import Message from './message.jsx'
import Search from './Search.jsx'
import Addpost from './Addpost.jsx'
import Login from './login.jsx'

import Register from './Register.jsx'
 import Otp from './Otp.jsx'
import Showprofile from './Showprofile.jsx'
import Showpost from './Showpost.jsx'
import Addstory from './Addstory.jsx'

const router = createBrowserRouter(

  [{
    path:'/register',
    element:<Register/>
  },{path:'/',
    element:<Login/>
  },{
    path:'/otp',
    element:<Otp/>
  },{
    path:'/addstory',
    element:<Addstory/>
  },

{
    
    path:'/home',
    element:<App/>
  },{
    path:'/story/:id',
    element:<Viewstory/>
  },{
    path:'/profile',
    element: <Profile/>
  },{
    path:'/editprofile',
    element:<EditProfile/>
  },
  {
    path:'/message',
    element:<Message/>
    
  },
  {
    path:'/search',
    element:<Search/>
  },{
  path:'/addpost',
  element:<Addpost/>
  },{
    path:'/showprofile/:id',
    element:<Showprofile/>
  },{
    path:'/showpost/:id',
    element:<Showpost/>
  }
  ]
)
createRoot(document.getElementById('root')).render(
  
   <RouterProvider router={router}/>
 
)
