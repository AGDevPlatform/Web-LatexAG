import React, { useState, useEffect, useCallback, useRef } from "react";

import styled from "styled-components";
import "./DraggableBox.css";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 5px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  justify-content: center;
`;

const FormulaButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 4px;
  transition: all 0.3s ease;
  background-color: white;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    border-color: #3b82f6;
    background-color: #eff6ff;
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: brightness(1.1);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContextMenu = styled.div`
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #ff0000;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};
const DraggableBox = ({
  insertFormula,
  favoriteButtons2,
  loadFavoriteButtons,
  visible,
  setVisible,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem("draggableBoxPosition");
    return savedPosition ? JSON.parse(savedPosition) : { x: 632, y: 136 };
  });

  const handleClose = () => {
    setVisible(false);
  };
  const [contextMenu, setContextMenu] = useState(null);
  useEffect(() => {
    const handleStorageChange = () => {
      loadFavoriteButtons();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadFavoriteButtons]);
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;

      setPosition((prevPosition) => {
        const newPosition = {
          x: prevPosition.x + event.movementX,
          y: prevPosition.y + event.movementY,
        };
        localStorage.setItem(
          "draggableBoxPosition",
          JSON.stringify(newPosition)
        );
        return newPosition;
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    if (e.target.closest('[data-draggable="true"]')) {
      setIsDragging(true);
    }
  };
  const handleContextMenu = useCallback((e, index) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      index: index,
    });
  }, []);

  const handleRemoveFavorite = useCallback(() => {
    if (contextMenu !== null) {
      const updatedButtons = favoriteButtons2.filter(
        (_, index) => index !== contextMenu.index
      );
      localStorage.setItem("favoriteButtons", JSON.stringify(updatedButtons));
      loadFavoriteButtons(); // Reload the interface
      setContextMenu(null);
      // toast.success("Button removed from favorites");
    }
  }, [contextMenu, favoriteButtons2, loadFavoriteButtons]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (contextMenu && !e.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [contextMenu]);

  if (!visible) {
    return null;
  }
  return (
    <div
      className="draggable-box"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: "90vh", // Tăng từ 80vh lên 90vh
        minHeight: "300px", // Thêm chiều cao tối thiểu
        minWidth: "250px",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="handle"
        data-draggable="true"
        style={{
          cursor: "move",
          backgroundColor: "#f0f0f0",
          padding: "8px",
          userSelect: "none",
        }}
      >
        <div className="relative h-8 flex items-center justify-between ">
          {/* <div className="ml-4 flex space-x-2 items-center">
            <span className="h-3 w-3 rounded-full bg-red-400"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            <span className="h-3 w-3 rounded-full bg-green-400"></span>
          </div> */}
          <div className="ml-3 text-gray-600 flex space-x-2 items-center">
            <button title="Close" onClick={handleClose}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-base font-light block text-sm font-medium truncate">
            📌 Pinned Formulas
          </div>
        </div>
      </div>

      {/* <CloseButton onClick={handleClose}>×</CloseButton> */}

      <div
        className="content"
        style={{ padding: "8px", overflowY: "auto", flexGrow: 1 }}
      >
        <GridContainer>
          {favoriteButtons2.map((item, index) => (
            <ButtonWrapper key={index}>
              <FormulaButton
                onClick={() =>
                  insertFormula(
                    item.formula,
                    item.pos,
                    item.x,
                    item.y,
                    false,
                    item.icon
                  )
                }
                onContextMenu={(e) => handleContextMenu(e, index)}
              >
                <img src={item.linkimage} alt={item.name} />
              </FormulaButton>
            </ButtonWrapper>
          ))}
        </GridContainer>
      </div>
      {contextMenu && (
        <ContextMenu
          className="context-menu"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            borderRadius: "10px",
          }}
        >
          <MenuItem
            onClick={handleRemoveFavorite}
            style={{ borderRadius: "10px" }}
          >
            ❌ Unpin Formula
          </MenuItem>
        </ContextMenu>
      )}
    </div>
  );
};

export default DraggableBox;
