import React, { useEffect, useContext } from 'react';
import { PiUserCircleFill, PiGearSix } from 'react-icons/pi';
import { BiLogOut } from 'react-icons/bi';
import { ThemeContext } from './../../../config/Theme/ThemeContext';
import './../../../assets/Components/general/ModalUsuario.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiShoppingBag4Fill } from "react-icons/ri";


const ModalUsuario = ({user_id, role, name, email, onClose }) => {
  
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

  const handlePurchaseHistory = () => {
    navigate('/historial', { state: { user_id } });
    onClose();
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
      {role === 'user' && (
          <button className="user-modal__option" onClick={handlePurchaseHistory}>
            <RiShoppingBag4Fill className="user-modal__icon" /> Historial de Compras
          </button>
        )}
       
      
        <button className="user-modal__option" onClick={handleLogout}>
          <BiLogOut className="user-modal__icon" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
