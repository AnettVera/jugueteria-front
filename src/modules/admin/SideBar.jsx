import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './../../assets/Components/admin/SideBar.scss';
import axios from 'axios';
import AddProductModal from '../../components/Admin/AddProductModal';

import { IoSchoolSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiRobot2Fill, RiBearSmileFill } from "react-icons/ri";
import { PiLegoDuotone } from "react-icons/pi";
import { FaDice } from "react-icons/fa6";
import { PiFlowerTulipFill } from "react-icons/pi";
import { TbTruckReturn } from "react-icons/tb";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const categoriesList = [
    { id: 1, name: 'Electrónicos', icon: <RiRobot2Fill /> },
    { id: 2, name: 'Demesa', icon: <FaDice /> },
    { id: 3, name: 'Construcción', icon: <PiLegoDuotone /> },
    { id: 4, name: 'Exteriores', icon: <PiFlowerTulipFill /> },
    { id: 5, name: 'Peluches', icon: <RiBearSmileFill /> },
    { id: 6, name: 'Educativos', icon: <IoSchoolSharp /> }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveNewProduct = (newProduct) => {
    // Aquí puedes manejar la lógica para guardar el nuevo producto
    handleCloseAddModal();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:6868/toystore/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
          {categoriesList.map((category) => (
            <li key={category.id} className="menu-link" onClick={() => navigate(`/productos?category=${category.name}`)}>
              <span className="menu-icon">{category.icon}</span>
              <span className="menu-text">{category.name}</span>
            </li>
          ))}
          <li className="menu-link" onClick={handleAddProduct}>
            <span className="menu-icon">Añadir nuevo producto</span>
          </li>
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
      {isAddModalOpen && (
        <AddProductModal
          onClose={handleCloseAddModal}
          onSave={handleSaveNewProduct}
        />
      )}
    </div>
  );
};

export default Sidebar;
