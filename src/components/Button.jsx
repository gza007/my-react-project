import React from 'react';

const Button = ({ label, onClick, isActive, disabled }) => (
  <button
    onClick={onClick}
    className={`custom-button ${isActive ? 'active' : ''}`}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;