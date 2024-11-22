import React from 'react';
import Sidebar from '../../../modules/admin/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className="admin-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
