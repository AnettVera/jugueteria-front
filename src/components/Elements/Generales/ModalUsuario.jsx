import React, { useEffect } from 'react';
import { PiUserCircleFill, PiGearSix } from 'react-icons/pi';
import { BiHistory, BiLogOut } from 'react-icons/bi';
import './../../../assets/Components/general/ModalUsuario.scss';

const ModalUsuario = ({ userType, userName, userEmail, onClose }) => {
  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.user-modal')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return (
    <div className="user-modal">
      <div className="user-modal__header">
        <PiUserCircleFill className="user-modal__avatar" />
        <h3 className="user-modal__name">{userName}</h3>
        <p className="user-modal__email">{userEmail}</p>
      </div>
      <div className="user-modal__body">
        {userType === 'cliente' && (
          <button className="user-modal__option">
            <BiHistory className="user-modal__icon" /> Historial de compras
          </button>
        )}
        <button className="user-modal__option">
          <PiGearSix className="user-modal__icon" /> Gestionar perfil
        </button>
        <button className="user-modal__option">
          <BiLogOut className="user-modal__icon" /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
