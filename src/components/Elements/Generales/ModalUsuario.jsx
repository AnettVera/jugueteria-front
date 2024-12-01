import React, { useEffect, useContext } from 'react';
import { PiUserCircleFill, PiGearSix } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import { ThemeContext } from './../../../config/Theme/ThemeContext';
import './../../../assets/Components/general/ModalUsuario.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const ModalUsuario = ({ role, name, email, onClose }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.user-modal')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    if (role === 'ADMIN') {
      navigate('/', { replace: true });
    } else {
      navigate(location.pathname, { replace: true });
    }
    window.location.reload();
  };

  return (
    <div className="user-modal">
      <div className="user-modal__header">
        <PiUserCircleFill className="user-modal__avatar" />
        <h3 className="user-modal__name">{name}</h3>
        <p className="user-modal__email">{email}</p>
        <p className="user-modal__role">{role}</p>
      </div>
      <button className="user-modal__themebutton" onClick={toggleTheme}>
        <span className="theme-icon">
          {theme === 'light' ? '🌞' : '🌙'}
        </span>
      </button>
      <div className="user-modal__body">
        <button className="user-modal__option">
          <PiGearSix className="user-modal__icon" /> Gestionar perfil
        </button>
        <button className="user-modal__option" onClick={handleLogout}>
          <BiLogOut className="user-modal__icon" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
