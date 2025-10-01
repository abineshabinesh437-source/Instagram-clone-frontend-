import React from 'react';
import Sidebar from './Sidebar';
import ProfileBox from './ProfileBox';

function Profile() {
  return (
    <div className="d-flex vh-100">
      <div className="w-20 border-end p-3">
        <Sidebar />
      </div>
      <div className="w-80 p-4">
        <ProfileBox />
      </div>
    </div>
  );
}

export default Profile;
