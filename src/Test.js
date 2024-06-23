import React, { useState, useRef } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const App = () => {
  const [inputText, setInputText] = useState("");
  const inputAreaRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const insertAtCursor = (textToInsert) => {
    const textarea = inputAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Check if the cursor is currently inside a "$..$" pair
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const selectedText = text.substring(start, end);
    const hasStartDollar = before.lastIndexOf("$");
    const hasEndDollar = after.indexOf("$");

    // If the cursor is inside a "$..$" pair, replace the selected text without adding extra "$" markers
    if (hasStartDollar !== -1 && hasEndDollar !== -1) {
      setInputText(before + selectedText + textToInsert + after);
    } else {
      // Otherwise, add "$..$" around the inserted text
      setInputText(before + `$${textToInsert}$` + after);
    }

    // Focus back on the textarea after inserting text
    textarea.focus();
  };

  const renderTextWithLatex = (text) => {
    const parts = text.split(/(\$[^\$]*\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <InlineMath
            className="text-teal-400"
            key={index}
            math={part.slice(1, -1)}
          />
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => insertAtCursor("x^2")}
        >
          x^2
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => insertAtCursor("\\sqrt{x}")}
        >
          √x
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => insertAtCursor("\\frac{a}{b}")}
        >
          a/b
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => insertAtCursor("\\int_0^\\infty")}
        >
          ∫
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => insertAtCursor("\\sum_{i=1}^n")}
        >
          Σ
        </button>
      </div>
      <div className="mb-4">
        <textarea
          ref={inputAreaRef}
          // id="inputArea"
          rows="4"
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text with LaTeX formulas between $"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="output-area border border-gray-300 rounded-md p-2 w-full">
        {renderTextWithLatex(inputText)}
      </div>
    </div>
  );
};

export default App;
