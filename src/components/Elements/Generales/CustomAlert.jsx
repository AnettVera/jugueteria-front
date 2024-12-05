import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './../../../assets/Components/general/Modal.scss';
import { BsFillPatchCheckFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const Alert = ({ title, text, icon, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <BsFillPatchCheckFill className="custom-alert-icon" style={{ color: 'var(--green-color)', fontSize: '2rem' }} />;
      case 'error':
        return <IoMdCloseCircle className="custom-alert-icon" style={{ color: 'var(--primary-color)', fontSize: '2rem' }} />;
      case 'info':
        return <BsFillInfoCircleFill className="custom-alert-icon" style={{ color: 'blue', fontSize: '2rem' }} />;
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal alert">
      <h2 className="custom-alert-title">{title}</h2>
        {icon && <div className='icon'>{getIcon(icon)}</div>}
      
        <p className="custom-alert-text">{text}</p>
        <div className='button'>
          <button onClick={onClose} className="custom-alert-button">
            Aceptar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const useCustomAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = ({ title, text, icon }) => {
    return new Promise((resolve) => {
      const handleClose = () => {
        setAlert(null);
        resolve(true);
      };
      setAlert(<Alert title={title} text={text} icon={icon} onClose={handleClose} />);
    });
  };

  return { alert, showAlert };
};
