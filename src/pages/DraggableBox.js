import React, { useState, useEffect, useCallback, useRef } from "react";

import styled from "styled-components";
import "./DraggableBox.css";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  justify-content: center;
`;
const FormulaButton = styled.button`
  width: 100%;
  aspect-ratio: 1 / 1;
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
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem("draggableBoxPosition");
    return savedPosition ? JSON.parse(savedPosition) : { x: 632, y: 136 };
  });
  const [height, setHeight] = useState(() => {
    const savedHeight = localStorage.getItem("draggableBoxHeight");
    return savedHeight ? parseInt(savedHeight, 10) : 200; // Default height
  });
  const [contextMenu, setContextMenu] = useState(null);
  const boxRef = useRef(null);

  const handleClose = () => {
    setVisible(false);
  };

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
      if (isDragging) {
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
      } else if (isResizing) {
        setHeight((prevHeight) => {
          const newHeight = Math.max(150, prevHeight + event.movementY);
          localStorage.setItem("draggableBoxHeight", newHeight.toString());
          return newHeight;
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleMouseDown = (e) => {
    if (e.target.closest('[data-draggable="true"]')) {
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
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
      loadFavoriteButtons();
      setContextMenu(null);
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
      ref={boxRef}
      className="draggable-box"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 7px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: `${height}px`,
        minHeight: "150px",
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
          padding: "5px",
          userSelect: "none",
        }}
      >
        <div className="relative h-8 flex items-center justify-center">
          <div className="text-base font-light text-sm font-medium truncate">
            📌 Pinned Formulas
          </div>
          <div className="absolute right-0 flex space-x-2 items-center mr-2">
            <button title="Close" onClick={handleClose}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className="content"
        style={{ padding: "3px", overflowY: "auto", flexGrow: 1 }}
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

      <div
        style={{
          height: "10px",
          cursor: "ns-resize",
          backgroundColor: "#f0f0f0",
        }}
        onMouseDown={handleResizeMouseDown}
      />

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
