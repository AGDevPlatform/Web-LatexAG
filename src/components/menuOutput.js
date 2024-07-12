// MenuOutput.js
import React from "react";
import IconButton from "./IconButton"; // Giả sử bạn có component IconButton
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const StyledCheckbox = styled.input`
  margin-right: 5px;
  height: 20px;
  width: 20px;
`;

const CheckboxLabel = styled.label`
  font-size: 18px;
  cursor: pointer;
`;

const MenuOutput = ({
  inputTextLength,
  zoomIn,
  zoomOut,
  reset,
  visible,
  setVisible,
}) => {
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

      <div className="flex space-x-1">
        <CheckboxContainer>
          <StyledCheckbox
            type="checkbox"
            id="favoriteButtonsCheckbox"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
          <CheckboxLabel htmlFor="favoriteButtonsCheckbox">
            📌 {visible ? "Show pinned window" : "Show pinned window"}
          </CheckboxLabel>
        </CheckboxContainer>
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
