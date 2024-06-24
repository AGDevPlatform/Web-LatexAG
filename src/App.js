import React, { useState, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import "./customFont.css"; // Create this CSS file to import your custom font
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
const App = () => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const basicFormulas = [
    { name: "Square", formula: "x^2" },
    { name: "Square Root", formula: "\\sqrt{x}" },
    { name: "Fraction", formula: "\\frac{x}{y}" },
    { name: "Integral", formula: "\\int_{a}^{b} x dx" },
    { name: "Sum", formula: "\\sum_{i=1}^{n} x_i" },
    { name: "Product", formula: "\\prod_{i=1}^{n} x_i" },
  ];

  const insertFormula = (formula) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const textBeforeCursor = inputText.substring(0, start);
    const textAfterCursor = inputText.substring(end);
    let newFormula = formula;
    let newCursorPos = start + formula.length;

    // Check if cursor is inside a $$ pair
    const beforeDollarCount = (textBeforeCursor.match(/\$/g) || []).length;
    const afterDollarCount = (textAfterCursor.match(/\$/g) || []).length;

    if (beforeDollarCount % 2 === 1 && afterDollarCount % 2 === 1) {
      // Cursor is inside $$, don't add extra $$
      newFormula = formula;
    } else {
      // Cursor is outside $$, add $$ around the formula
      newFormula = `$${formula}$`;
      newCursorPos += 2; // Adjust for added $ signs
    }

    const newText = textBeforeCursor + newFormula + textAfterCursor;
    setInputText(newText);

    // Set cursor position after update
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f3f3f3" }}>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {basicFormulas.map((item, index) => (
            <button
              key={index}
              onClick={() => insertFormula(item.formula)}
              style={{ padding: "5px 10px" }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 h-screen border border-gray-300  divide-x divide-solid divide-black divide-w-2">
        <div className="h-full">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter LaTeX formula"
            className="w-full h-full p-4  text-base mb-4 outline-none"
          />
        </div>
        <div
          className="h-full p-4 mb-4 text-lg font-medium custom-font-output overflow-auto"
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              textAlign: "justify",
            }}
          >
            <Latex>{inputText}</Latex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
