import React from 'react';

const ContextMenu = ({ x, y, onPaste }) => {
  return (
    <div style={{ top: y, left: x, position: 'absolute', backgroundColor: 'white', border: '1px solid black', zIndex: 1000 }}>
      <button onClick={onPaste}>Paste</button>
    </div>
  );
};

export default ContextMenu;
