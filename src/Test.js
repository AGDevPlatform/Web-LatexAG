import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FormulaGridContainer = ({ insertFormula }) => {
  const [formulaGrids, setFormulaGrids] = useState([
    { id: "grid1", formulas: basicFormulas, rows: 4 },
    { id: "grid2", formulas: basicFormulas2, rows: 3 },
    { id: "grid3", formulas: basicFormulas5, rows: 3 },
    { id: "grid4", formulas: basicFormulas10, rows: 3 },
    { id: "grid5", formulas: basicFormulas3, rows: 6 },
    { id: "grid6", formulas: basicFormulas4, rows: 6 },
    { id: "grid7", formulas: basicFormulas6, rows: 4 },
    { id: "grid8", formulas: basicFormulas7, rows: 6 },
    { id: "grid9", formulas: basicFormulas9, rows: 6 },
    { id: "grid10", formulas: basicFormulas8, rows: 10 },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newFormulaGrids = Array.from(formulaGrids);
    const [reorderedItem] = newFormulaGrids.splice(result.source.index, 1);
    newFormulaGrids.splice(result.destination.index, 0, reorderedItem);

    setFormulaGrids(newFormulaGrids);
  };

  return (
    <div
      className="grid grid-cols-[155px,1fr,1fr] gap-0 divide-x divide-solid divide-gray"
      style={{ borderRadius: "10px" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formulaGrids">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="overflow-y-auto p-1 flex flex-col gap-0 flex-shrink-0"
              style={{
                maxHeight: "calc(85vh + 48px)",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              {formulaGrids.map((grid, index) => (
                <Draggable key={grid.id} draggableId={grid.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormulaGrid
                        formulas={grid.formulas}
                        rows={grid.rows}
                        insertFormula={insertFormula}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FormulaGridContainer;
