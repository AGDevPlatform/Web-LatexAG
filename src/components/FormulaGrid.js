// import React from "react";
// import styled from "styled-components";

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-rows: ${(props) => `repeat(${props.rows}, minmax(0, 1fr))`};
//   grid-auto-flow: column;
//   background-color: white;
//   border-radius: 8px;
//   padding: 10px;
//   ${"" /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */}
//   justify-content: center;
// `;

// const FormulaButton = styled.button`
//   width: 40px;
//   height: 40px;
//   border: 1px solid transparent;
//   border-radius: 8px;
//   padding: 4px;
//   transition: all 0.3s ease;
//   background-color: white;

//   &:hover {
//     transform: scale(1.1);
//     box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
//     border-color: #3b82f6;
//     background-color: #eff6ff;
//   }

//   &:active {
//     transform: scale(0.95);
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//     transition: all 0.3s ease;
//   }

//   &:hover img {
//     filter: brightness(1.1);
//   }
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const FormulaGrid = ({ formulas, rows, insertFormula }) => (
//   <div className="mb-3">
//     <GridContainer
//       rows={rows}
//       className="shadow"
//     >
//       {formulas.map((item, itemIndex) => (
//         <ButtonWrapper key={itemIndex}>
//           <FormulaButton
//             onClick={() =>
//               insertFormula(
//                 item.formula,
//                 item.pos,
//                 item.x,
//                 item.y,
//                 false,
//                 item.icon
//               )
//             }
//           >
//             <img src={item?.linkimage} alt="formula" />
//           </FormulaButton>
//         </ButtonWrapper>
//       ))}
//     </GridContainer>
//   </div>
// );

// export default FormulaGrid;
import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rows}, minmax(0, 1fr))`};
  grid-auto-flow: column;
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
  padding: 6px;
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

const FormulaGrid = ({
  formulas,
  rows,
  insertFormula,
  loadFavoriteButtons,
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);
  const handleContextMenu = useCallback((e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item: item,
    });
  }, []);

  const handleAddToFavorites = useCallback(() => {
    const newItem = {
      name: contextMenu.item.name,
      formula: contextMenu.item.formula,
      linkimage: contextMenu.item.linkimage,
      pos: contextMenu.item.pos,
      x: contextMenu.item.x,
      y: contextMenu.item.y,
      icon: contextMenu.item.icon,
    };

    // Get current list from localStorage
    const currentList = JSON.parse(
      localStorage.getItem("favoriteButtons") || "[]"
    );

    // Add new item to the list
    const updatedList = [...currentList, newItem];

    localStorage.setItem("favoriteButtons", JSON.stringify(updatedList));
    setContextMenu(null);
    loadFavoriteButtons();
    // toast.success(
    //   `Formula '${contextMenu.item.formula}' has been pinned successfully`
    // );
  }, [contextMenu]);

  const handleOutsideClick = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setContextMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="mb-3">
      <GridContainer rows={rows} className="shadow">
        {formulas.map((item, itemIndex) => (
          <ButtonWrapper key={itemIndex}>
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
              onContextMenu={(e) => handleContextMenu(e, item)}
            >
              <img src={item?.linkimage} alt="formula" />
            </FormulaButton>
          </ButtonWrapper>
        ))}
      </GridContainer>
      {contextMenu && (
        <ContextMenu
          ref={menuRef}
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            borderRadius: "10px",
          }}
        >
          <MenuItem
            onClick={handleAddToFavorites}
            style={{ borderRadius: "10px" }}
          >
            📌 Pin Selected Formula
          </MenuItem>
        </ContextMenu>
      )}
    </div>
  );
};

export default FormulaGrid;
