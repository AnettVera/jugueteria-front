import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../modules/admin/SideBar';
import Header from '../../Elements/Generales/Header';
const AdminLayout = () => {
  return (
    <div className='main-content'>
      <Header />
      <Sidebar />
      <div className="admin-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
