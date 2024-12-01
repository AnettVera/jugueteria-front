import React, { useState, useEffect, useContext } from 'react';
import Logo from './../../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircleFill } from "react-icons/pi";
import './../../../assets/Components/general/Header.scss';
import ModalUsuario from './ModalUsuario';
import { AuthContext } from './../../../config/context/auth-context';
import axios from 'axios';
import { HiMenu } from "react-icons/hi";

const Header = () => {
  const { user: authUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Navegar y hacer scroll
  const navigateAndScroll = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Pequeño retraso para asegurar que la página cargue.
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="Logo" /></Link>
        {user && <span>Bienvenido, {user.name}</span>}
      </div>

      <button className="header__menu-icon" onClick={toggleMenu}>
        <HiMenu />
      </button>

      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        {authUser.signed ? (
          <>
            {authUser.roles.some(role => role.type === 'ADMIN') ? (
              <Link to="/dashboard" className="header__link">Panel de Administrador</Link>
            ) : (
              <>
                <button className="header__link" onClick={() => navigateAndScroll('quienes-somos')}>¿Quiénes somos?</button>
                <button className="header__link" onClick={() => navigateAndScroll('contactanos')}>Contáctanos</button>
              </>
            )}
            <button className="header__user-icon" onClick={toggleModal}>
              <PiUserCircleFill />
            </button>
            {isModalOpen && (
              <ModalUsuario
                role={user?.role}
                name={`${user?.name} ${user?.last_name}`}
                email={user?.email}
                onClose={closeModal}
              />
            )}
          </>
        ) : (
          <>
            <button className="header__link" onClick={() => navigateAndScroll('quienes-somos')}>¿Quiénes somos?</button>
            <button className="header__link" onClick={() => navigateAndScroll('contactanos')}>Contáctanos</button>
            <Link to="/login" className="header__link">Iniciar sesión</Link>
            <Link to="/register"><button className="header__register-btn">Registrarse</button></Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
