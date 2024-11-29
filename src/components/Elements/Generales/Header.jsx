import React, { useState, useEffect } from 'react';
import Logo from './../../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircleFill } from "react-icons/pi";
import './../../../assets/Components/general/Header.scss';
import ModalUsuario from './ModalUsuario';
import axios from 'axios';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt_token');
      const userId = localStorage.getItem('user_id');
      if (token && userId) {
        try {
          const response = await axios.get(`http://localhost:6868/toystore/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="Logo" /></Link>
        {user && <span>Bienvenido, {user.name}</span>}
      </div>
      
      <nav className="header__nav">
        {user ? (
          <>
            <a href="#quienes-somos" className="header__link">¿Quiénes somos?</a>
            <a href="#contactanos" className="header__link">Contáctanos</a>
            <button className="header__user-icon" onClick={toggleModal}>
              <PiUserCircleFill />
            </button>
            {isModalOpen && (
              <ModalUsuario
                role={user.role}
                name={`${user.name} ${user.last_name}`}
                email={user.email}
                onClose={closeModal}
              />
            )}
          </>
        ) : (
          <>
            <a href="#quienes-somos" className="header__link">¿Quiénes somos?</a>
            <a href="#contactanos" className="header__link">Contáctanos</a>
            <Link to="/login" className="header__link">Iniciar sesión</Link>
            <Link to="/register"><button className="header__register-btn">Registrarse</button></Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
