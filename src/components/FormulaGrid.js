// FormulaGrid.js
import React from "react";
const FormulaGrid = ({ formulas, rows, insertFormula }) => (
  <div className="mb-3">
    <div
      className="grid grid-flow-col"
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        borderColor: "#D3D3D3",
        borderRadius: "5px",
        borderWidth: "1px",
        padding: "6px",
        backgroundColor: "white",
      }}
    >
      {formulas.map((item, itemIndex) => (
        <div key={itemIndex} className="flex justify-center items-center">
          <button
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
            className="w-9 h-9 border border-transparent hover:bg-blue-100 hover:border-blue-200 transition-colors duration-300 p-0.5 rounded"
          >
            <img
              src={item?.linkimage}
              alt="formula"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default FormulaGrid;
