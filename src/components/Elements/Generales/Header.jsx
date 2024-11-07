import React, { useState } from 'react';
import Logo from './../../../../public/Logo.png';
import { PiUserCircleFill } from "react-icons/pi";
import './../../../assets/Components/general/Header.scss';
import './ModalUsuario';
import ModalUsuario from './ModalUsuario';

const Header = ({ isAuthenticated, userType, userName, userEmail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
      </div>
      
      <nav className="header__nav">
        {isAuthenticated ? (
          <>
            <button className="header__user-icon" onClick={toggleModal}>
              <PiUserCircleFill />
            </button>
            {isModalOpen && (
              <ModalUsuario
                userType={userType}
                userName={userName}
                userEmail={userEmail}
                onClose={closeModal}
              />
            )}
          </>
        ) : (
          <>
            <a href="#quienes-somos" className="header__link">¿Quiénes somos?</a>
            <a href="#contactanos" className="header__link">Contáctanos</a>
            <a href="#iniciar-sesion" className="header__link">Iniciar sesión</a>
            <button className="header__register-btn">Registrarse</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
