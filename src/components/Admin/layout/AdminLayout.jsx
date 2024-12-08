import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../../modules/admin/SideBar';
import Header from '../../Elements/Generales/Header';
import { useCustomAlert } from '../../Elements/Generales/CustomAlert';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { alert, showAlert } = useCustomAlert();

  const handleAlert = async (options) => {
    await showAlert(options);
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className='main-content'>
      <Header />
      <Sidebar />
      <div className="admin-content">
        <Outlet context={{ handleAlert, handleRedirect }} /> 
      </div>
      {alert}
    </div>
  );
};

export default AdminLayout;
