import React from 'react';

// Exported remote button component
const Button = ({ text, onClick, type = 'primary' }) => {
  const styles = {
    primary: {
      backgroundColor: '#1677ff',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f0f0f0',
      color: '#000',
    },
    danger: {
      backgroundColor: '#ff4d4f',
      color: 'white',
    }
  };

  const baseStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    ...styles[type]
  };

  return (
    <button 
      style={baseStyle}
      onClick={onClick}
    >
      {text || 'Button'}
    </button>
  );
};

export default Button;
