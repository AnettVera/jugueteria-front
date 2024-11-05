import React, { useState } from 'react';
import Logo from './../../../public/logo.png';
import { PiUserCircleFill } from "react-icons/pi";
import './../../assets/Components/Header.scss'

const Header = ({ isAuthenticated}) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
      </div>
      
      <nav className="header__nav">
        {isAuthenticated ? (
          <button className="header__user-icon" >
            <PiUserCircleFill/>
          </button>
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
