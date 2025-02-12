import React from 'react';

// Exported remote card component
const Card = ({ 
  title, 
  children, 
  extra,
  cover,
  style = {} 
}) => {
  const cardStyle = {
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    width: '300px',
    ...style
  };

  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const bodyStyle = {
    padding: '16px'
  };

  const coverStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
  };

  return (
    <div style={cardStyle}>
      {cover && (
        <div style={{ marginBottom: '-1px' }}>
          <img src={cover} alt="cover" style={coverStyle} />
        </div>
      )}
      {(title || extra) && (
        <div style={headerStyle}>
          <div style={{ fontWeight: 500, fontSize: '16px' }}>{title}</div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Card;
