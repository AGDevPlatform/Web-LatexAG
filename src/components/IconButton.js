// IconButton.js
import React from "react";

const IconButton = ({ icon, onClick, margin = "4px" }) => {
  return (
    <button
      style={{
        margin: margin,
        padding: "4px",
        color: "#808080",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1f1f")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#616161")}
      onClick={onClick}
    >
      <i className={`${icon} fa-xl`} />
    </button>
  );
};

export default IconButton;
