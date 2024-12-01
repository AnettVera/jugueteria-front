import React from 'react';
import '../../../src/output.scss';
import '../../assets/Components/general/FloatingButton.scss';
import { FaCartShopping } from "react-icons/fa6";


const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      <FaCartShopping />
    </button>
  );
};

export default FloatingButton;
