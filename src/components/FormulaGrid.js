// // FormulaGrid.js
// import React from "react";
// const FormulaGrid = ({ formulas, rows, insertFormula }) => (
//   <div className="mb-3">
//     <div
//       className="grid grid-flow-col bg-white shadow-md rounded"
//       style={{
//         gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
//         borderColor: "#D3D3D3",
//         borderRadius: "5px",

//         padding: "7px",
//         backgroundColor: "white",
//       }}
//     >
//       {formulas.map((item, itemIndex) => (
//         <div key={itemIndex} className="flex justify-center items-center">
//           <button
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
//             className="w-9 h-9 border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-1 rounded"
//           >
//             <img
//               src={item?.linkimage}
//               alt="formula"
//               className="w-full h-full object-contain"
//             />
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default FormulaGrid;

import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rows}, minmax(0, 1fr))`};
  grid-auto-flow: column;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const FormulaGrid = ({ formulas, rows, insertFormula }) => (
  <div className="mb-3">
    <GridContainer rows={rows}>
      {formulas.map((item, itemIndex) => (
        <div key={itemIndex} className="flex justify-center items-center">
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
          >
            <img src={item?.linkimage} alt="formula" />
          </FormulaButton>
        </div>
      ))}
    </GridContainer>
  </div>
);

export default FormulaGrid;
// import React, { useState, useEffect } from "react";
// import ContextMenu from "./ContextMenu";
// import { ToastContainer, toast } from "react-toastify";

// const FormulaGrid = ({ formulas, rows, insertFormula }) => {
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     itemIndex: null,
//   });

//   const handleContextMenu = (e, itemIndex) => {
//     e.preventDefault();
//     setContextMenu({ visible: true, x: e.clientX, y: e.clientY, itemIndex });
//   };

//   const handleMenuItemClick = (action) => {
//     toast.success("Hello");
//     console.log("Hello");
//     const item = formulas[contextMenu.itemIndex];
//     if (action === "showFormula") {
//       alert(`Formula: ${item.formula}`);
//       toast.success("Hello");
//     }
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (contextMenu.visible) {
//         setContextMenu({ ...contextMenu, visible: false });
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [contextMenu]);

//   return (
//     <div className="mb-3">
//       <div
//         className="grid grid-flow-col bg-white shadow-md rounded"
//         style={{
//           gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
//           borderColor: "#D3D3D3",
//           borderRadius: "5px",
//           padding: "7px",
//           backgroundColor: "white",
//         }}
//       >
//         {formulas.map((item, itemIndex) => (
//           <div key={itemIndex} className="flex justify-center items-center">
//             <button
//               onClick={() =>
//                 insertFormula(
//                   item.formula,
//                   item.pos,
//                   item.x,
//                   item.y,
//                   false,
//                   item.icon
//                 )
//               }
//               onContextMenu={(e) => handleContextMenu(e, itemIndex)}
//               className="w-9 h-9 border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-1 rounded"
//             >
//               <img
//                 src={item?.linkimage}
//                 alt="formula"
//                 className="w-full h-full object-contain"
//               />
//             </button>
//           </div>
//         ))}
//       </div>
//       {contextMenu.visible && (
//         <ContextMenu
//           x={contextMenu.x}
//           y={contextMenu.y}
//           onClose={() => setContextMenu({ ...contextMenu, visible: false })}
//         >
//           <button
//             onClick={() => handleMenuItemClick("showFormula")}
//             className="block w-full text-left px-2 py-1 hover:bg-blue-100"
//           >
//             Show Formula
//           </button>
//         </ContextMenu>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default FormulaGrid;
