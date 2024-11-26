import React, { useEffect } from 'react';
import './../../../assets/Components/general/Modal.scss';
import { BsFillPatchCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const Alerts = ({ message, type, onClose }) => {
  const alertStyles = {
    success: {
      icon: <BsFillPatchCheckFill style={{ color: 'var(--green-color)' }} />,
      bgColor: 'rgba(0, 128, 0, 0.2)', 
      textColor: 'var(--lg-text-color)',
    },
    info: {
      icon: <BsFillInfoCircleFill style={{ color: 'blue' }} />,
      bgColor: 'rgba(0, 0, 255, 0.2)', 
      textColor: 'var(--lg-text-color)',
    },
    error: {
      icon: <IoMdCloseCircle style={{ color: 'var(--primary-color)' }} />,
      bgColor: 'rgba(255, 0, 0, 0.2)', 
      textColor: 'var(--lg-text-color)',
    },
  };

  const style = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (

    <div className='modal-container'>
    <div className='modal'>
      <button className='close-button'></button>
      {style.icon}
      <span>{message}</span>
    </div>
  </div>
   
  );
};

export default Alerts;

