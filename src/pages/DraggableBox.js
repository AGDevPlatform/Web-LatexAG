import React, { useState, useEffect } from "react";
import "./DraggableBox.css";

const DraggableBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;

      setPosition((prevPosition) => ({
        x: prevPosition.x + event.movementX,
        y: prevPosition.y + event.movementY,
      }));
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

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      className="draggable-box"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="handle">Drag me</div>
      <div className="content">
        <p>This is a draggable chatbox</p>
      </div>
    </div>
  );
};

export default DraggableBox;
