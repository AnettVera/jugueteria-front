import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './../../assets/Components/admin/SideBar.scss';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-layout">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Juguetería</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/productos?category=educativos">Educativos</Link>
          </li>
          <li>
            <Link to="/productos?category=electronicos">Electrónicos</Link>
          </li>
          <li>
            <Link to="/productos?category=construccion">Construcción</Link>
          </li>
          <li>
            <Link to="/productos?category=de-mesa">De Mesa</Link>
          </li>
          <li>
            <Link to="/productos?category=peluches">Peluches</Link>
          </li>
          <li>
            <Link to="/productos?category=exterior">Exterior</Link>
          </li>
          <li>
            <Link to="/productos?category=devoluciones">Devoluciones</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
