import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './../../assets/Components/admin/SideBar.scss';

import { IoSchoolSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiRobot2Fill, RiBearSmileFill } from "react-icons/ri";
import { PiLegoDuotone } from "react-icons/pi";
import { FaDice } from "react-icons/fa6";
import { PiFlowerTulipFill } from "react-icons/pi";
import { TbTruckReturn } from "react-icons/tb";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-layout">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isOpen && <span>Juguetería</span>}
          <button className="toggle-button-side" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className="sidebar-menu">
          <Link to="/dashboard" className="menu-link">
            <li>
              <MdDashboard className="menu-icon" />
              {isOpen && <span>Dashboard</span>}
            </li>
          </Link>
          <Link to="/productos?category=educativos" className="menu-link">
            <li>
              <IoSchoolSharp className="menu-icon" />
              {isOpen && <span>Educativos</span>}
            </li>
          </Link>
          <Link to="/productos?category=electronicos" className="menu-link">
            <li>
              <RiRobot2Fill className="menu-icon" />
              {isOpen && <span>Electrónicos</span>}
            </li>
          </Link>
          <Link to="/productos?category=construccion" className="menu-link">
            <li>
              <PiLegoDuotone className="menu-icon" />
              {isOpen && <span>Construcción</span>}
            </li>
          </Link>
          <Link to="/productos?category=de-mesa" className="menu-link">
            <li>
              <FaDice className="menu-icon" />
              {isOpen && <span>De Mesa</span>}
            </li>
          </Link>
          <Link to="/productos?category=peluches" className="menu-link">
            <li>
              <RiBearSmileFill className="menu-icon" />
              {isOpen && <span>Peluches</span>}
            </li>
          </Link>
          <Link to="/productos?category=exterior" className="menu-link">
            <li>
              <PiFlowerTulipFill className="menu-icon" />
              {isOpen && <span>Exterior</span>}
            </li>
          </Link>
          <Link to="/devoluciones" className="menu-link">
            <li>
              <TbTruckReturn className="menu-icon" />
              {isOpen && <span>Devoluciones</span>}
            </li>
          </Link>
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
