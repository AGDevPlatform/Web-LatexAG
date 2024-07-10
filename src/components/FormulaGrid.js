import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rows}, minmax(0, 1fr))`};
  grid-auto-flow: column;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  ${"" /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */}
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

const FormulaGrid = ({ formulas, rows, insertFormula }) => (
  <div className="mb-3">
    <GridContainer
      rows={rows}
      className="shadow"
      // style={{ borderWidth: "1px", borderColor: "#E6E6E6" }}
    >
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
          >
            <img src={item?.linkimage} alt="formula" />
          </FormulaButton>
        </ButtonWrapper>
      ))}
    </GridContainer>
  </div>
);

export default FormulaGrid;
