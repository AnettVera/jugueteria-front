import React from 'react';
import { Spinner } from 'flowbite-react';
import Logo from './../../assets/images/logo.png';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={Logo} alt="Logo" className="loading-logo" />
      <Spinner className="loading-spinner" />
      <p>Cargando...</p>
    </div>
  );
};

export default Loading;