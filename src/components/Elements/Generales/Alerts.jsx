import React, { useEffect } from 'react';
import './../../../assets/Components/general/Modal.scss';
import { BsFillPatchCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const Alerts = ({ message, type, onClose }) => {
  const alertStyles = {
    success: {
      messagedefault: 'Se ha realizado con éxito',
      icon: <BsFillPatchCheckFill style={{ color: 'var(--green-color)', display: 'block', margin: '4px auto', fontSize:'25px' }} />,
      bgColor: 'rgba(0, 128, 0, 0.2)',
      textColor: 'var(--lg-text-color)',
    },
    info: {
      messagedefault: 'Información importante',
      icon: <BsFillInfoCircleFill style={{ color: 'blue', display: 'block', margin: '0 auto' }} />,
      bgColor: 'rgba(0, 0, 255, 0.2)',
      textColor: 'var(--lg-text-color)',
    },
    error: {
      messagedefault: 'Ha ocurrido un problema',
      icon: <IoMdCloseCircle style={{ color: 'var(--primary-color)', display: 'block', margin: '0 auto' }} />,
      bgColor: 'rgba(255, 0, 0, 0.2)',
      textColor: 'var(--lg-text-color)',
    },
  };

  const style = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='shipping-details'>
          <div className='disclaimer'>
            <div style={{textAlign:'center', fontWeight:'bold'}}>{style.messagedefault}</div>
            <div className='icon'>{style.icon}</div>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
