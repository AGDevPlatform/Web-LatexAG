// ContextMenu.js
import React from "react";
import ReactDOM from "react-dom";

const ContextMenu = ({ x, y, onClose, children }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: y,
        left: x,
        zIndex: 1000,
        backgroundColor: "white",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: "4px",
        padding: "8px",
      }}
    >
      {children}
      <button onClick={onClose} style={{ marginTop: "8px" }}>
        Close
      </button>
    </div>,
    document.body
  );
};

export default ContextMenu;
