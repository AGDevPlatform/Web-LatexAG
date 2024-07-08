// MenuOutput.js
import React from "react";
import IconButton from "./IconButton"; // Giả sử bạn có component IconButton

const MenuOutput = ({ inputTextLength, zoomIn, zoomOut, reset }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        borderColor: "#E5E5E5",
        borderBottomWidth: "1px",
      }}
      className="flex items-center justify-between"
    >
      <div className="flex ml-3">
        <button
          style={{
            margin: "8px",
            padding: "4px",
            color: "#000000",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
        >
          <i className="fa-solid fa-check fa-xl"></i> {inputTextLength}{" "}
          characters
        </button>
      </div>

      <div className="flex space-x-2">
        <IconButton
          icon="fa-solid fa-magnifying-glass-plus"
          onClick={zoomIn}
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-magnifying-glass-minus"
          onClick={zoomOut}
          margin="8px"
        />
        <IconButton
          icon="fa-solid fa-arrows-rotate"
          onClick={reset}
          margin="8px"
        />
      </div>
    </div>
  );
};

export default MenuOutput;
